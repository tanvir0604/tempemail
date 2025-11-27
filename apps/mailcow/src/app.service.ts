import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import Imap = require('imap');
import { simpleParser } from 'mailparser';
import { ClientProxy } from '@nestjs/microservices';

import {
  DeleteMailCowAliasDto,
  type CreateImapConnectionDto,
} from '@repo/validation';

import {
  CreateEmailContentDto,
  CreateMailCowNewAliasDto,
  sanitize,
} from '@repo/validation';

@Injectable()
export class AppService {
  private imap: Imap;
  private processing: boolean = false;
  private readonly logger = new Logger(AppService.name);
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @Inject('SETTINGS_SERVICE') readonly settingsClient: ClientProxy,
  ) {}

  onModuleInit() {
    this.logger.log('-------------------Initializing IMAP-------------------');
    this.initializeImapForAll();
  }

  async initializeImapForAll() {
    const domainInfo = await lastValueFrom(
      this.settingsClient.send('domain.findAll', { status: true }),
    );

    for (const domain of domainInfo) {
      // console.log('domain', domain);
      if (domain.domainUsers && domain.domainUsers.length > 0) {
        for (const domainUser of domain.domainUsers) {
          // console.log('domainUser', domainUser);
          this.initializeImap({
            host: domain.imapHost,
            port: domain.imapPort,
            username: domainUser.imapUserName,
            password: domainUser.imapPassword,
          });
        }
      }
    }
  }

  async createNewAlias(domainData: CreateMailCowNewAliasDto) {
    // console.log('domainData', domainData);
    const MAILCOW_USERNAME = domainData.username;
    const USER_EMAIL = domainData.email;
    const MAILCOW_API_URL = domainData.apiUrl;
    const MAILCOW_API_KEY = domainData.apiKey;

    if (!MAILCOW_API_URL) {
      throw new Error('MAILCOW_API_URL is not set');
    }
    if (!MAILCOW_USERNAME) {
      throw new Error('MAILCOW_USERNAME is not set');
    }
    if (!MAILCOW_API_KEY) {
      throw new Error('MAILCOW_API_KEY is not set');
    }

    const data = {
      active: '1',
      address: USER_EMAIL,
      goto: MAILCOW_USERNAME,
    };

    const res = await firstValueFrom(
      this.httpService.post(MAILCOW_API_URL + '/add/alias', data, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': MAILCOW_API_KEY,
        },
      }),
    );

    if (res.data.error) {
      throw new Error(res.data.error.message);
    }

    if (res.data[0] && res.data[0].msg[0] == 'alias_added') {
      return {
        email: res.data[0].msg[1],
        emailId: res.data[0].msg[2],
      };
    }

    return null;
  }

  async deleteAlias(domainData: DeleteMailCowAliasDto) {
    const MAILCOW_API_URL = domainData.apiUrl;
    const MAILCOW_API_KEY = domainData.apiKey;

    if (!MAILCOW_API_URL) {
      throw new Error('MAILCOW_API_URL is not set');
    }
    if (!MAILCOW_API_KEY) {
      throw new Error('MAILCOW_API_KEY is not set');
    }

    const res = await firstValueFrom(
      this.httpService.post(MAILCOW_API_URL + '/delete/alias', domainData.ids, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': MAILCOW_API_KEY,
        },
      }),
    );

    if (res.data.error) {
      throw new Error(res.data.error.message);
    }

    if (res.data[0] && res.data[0].msg[0] == 'alias_removed') {
      return {
        email: res.data[0].msg[1],
        emailId: res.data[0].msg[2],
      };
    }

    return null;
  }

  initializeImap(
    credentials: CreateImapConnectionDto,
    keepAlive: boolean = false,
  ) {
    const IMAP_HOST = credentials.host;
    const IMAP_PORT = credentials.port;
    const IMAP_USERNAME = credentials.username;
    const IMAP_PASSWORD = credentials.password;
    const IMAP_TLS = true;

    if (!IMAP_HOST) {
      throw new Error('IMAP_HOST is not set');
    }
    if (!IMAP_PORT) {
      throw new Error('IMAP_PORT is not set');
    }
    if (!IMAP_USERNAME) {
      throw new Error('IMAP_USERNAME is not set');
    }
    if (!IMAP_PASSWORD) {
      throw new Error('IMAP_PASSWORD is not set');
    }

    const config: any = {
      user: IMAP_USERNAME,
      password: IMAP_PASSWORD,
      host: IMAP_HOST,
      port: IMAP_PORT || 993,
      tls: IMAP_TLS !== undefined ? IMAP_TLS : true,
      tlsOptions: { rejectUnauthorized: false },
    };

    if (keepAlive) {
      config.keepalive = {
        interval: 10000,
        idleInterval: 300000,
        forceNoop: true,
      };
    }

    this.imap = new Imap(config);

    this.imap.once('ready', async () => {
      this.logger.log('IMAP ready, opening INBOX');
      this.imap.openBox('INBOX', false, (err, box) => {
        if (err) throw err;
        this.logger.log(
          `Mailbox opened, total messages: ${box.messages.total}`,
        );

        // Listen for new messages
        this.imap.on('mail', async (numNewMsgs) => {
          this.logger.log(`${numNewMsgs} new message(s) arrived`);
          if (!this.processing) {
            this.processing = true;
            await this.fetchNewMessages();
            this.processing = false;
          }
        });
      });
    });

    this.imap.once('error', (err) => {
      this.logger.error(`IMAP error: ${err.message}`);
      setTimeout(() => this.imap.connect(), 5000); // reconnect on error
    });

    this.imap.once('end', () => {
      this.logger.log('IMAP connection ended, reconnecting...');
      setTimeout(() => this.imap.connect(), 5000);
    });

    this.imap.connect();
  }

  private async fetchNewMessages() {
    const tracker = await lastValueFrom(
      this.settingsClient.send('emailContent.lastUID', {}),
    );
    const startUid = tracker?._max?.uid + 1 || 1;

    this.imap.search([['UID', `${startUid}:*`]], (err, results) => {
      if (err || !results || results.length === 0) return;

      const fetch = this.imap.fetch(results, { bodies: '', struct: true });
      const messagePromises: Promise<void>[] = [];

      fetch.on('message', (msg, seqno) => {
        const p = new Promise<void>((resolveMessage) => {
          let uid: number;
          msg.once('attributes', (attrs) => {
            uid = attrs.uid;
          });

          msg.on('body', (stream) => {
            simpleParser(stream as any)
              .then(async (parsed) => {
                const references = Array.isArray(parsed.references)
                  ? parsed.references[0]
                  : parsed.references;

                const to = Array.isArray(parsed.to) ? parsed.to[0] : parsed.to;
                if (
                  !to?.value?.[0]?.address ||
                  !parsed.from?.value?.[0]?.address
                )
                  return;

                const subject = sanitize(parsed.subject ?? '');
                const text = sanitize(parsed.text ?? '');
                const html = sanitize(parsed.html ? parsed.html : '');

                const insertData: CreateEmailContentDto = {
                  content: {
                    fromName: parsed.from?.value[0]?.name ?? '',
                    from: parsed.from?.value[0]?.address ?? '',
                    to: to?.value[0]?.address ?? '',
                    subject: subject,
                    text: text,
                    html: html,
                    messageId: parsed.messageId ?? '',
                    references: references ?? '',
                  },
                  fromName: parsed.from?.value[0]?.name ?? '',
                  from: parsed.from?.value[0]?.address ?? '',
                  to: to?.value[0]?.address ?? '',
                  subject: subject,
                  text: text,
                  html: html,
                  messageId: parsed.messageId ?? '',
                  references: references ?? '',
                  tempEmailRef: to?.value[0]?.address,
                  uid: uid,
                };
                // this.logger.log('Inserting message', insertData, parsed);
                await lastValueFrom(
                  this.settingsClient.send('emailContent.create', insertData),
                );
              })
              .finally(() => resolveMessage());
          });
        });
        messagePromises.push(p);
      });

      fetch.once('end', async () => {
        await Promise.all(messagePromises);
        this.logger.log('Finished processing new messages');
      });
    });
  }

  async getDomainInfo(domain: string) {
    return await lastValueFrom(
      this.settingsClient.send('domain.findOne', { domain: domain }),
    );
  }
}
