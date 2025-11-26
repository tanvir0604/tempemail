import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, lastValueFrom } from 'rxjs';
// import Imap from 'imap';
import Imap = require('imap');
import { simpleParser, ParsedMail } from 'mailparser';
import { ClientProxy } from '@nestjs/microservices';

import { CreateEmailContentDto, sanitize } from '@repo/validation';

@Injectable()
export class AppService {
  private imap: Imap;
  private readonly logger = new Logger(AppService.name);
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @Inject('SETTINGS_SERVICE') readonly settingsClient: ClientProxy,
  ) {}
  async createNewAlias(email: string) {
    const MAILCOW_DOMAIN = this.configService.get<string>('MAILCOW_DOMAIN');
    const MAILCOW_USERNAME = this.configService.get<string>('MAILCOW_USERNAME');
    const MAILCOW_API_URL = this.configService.get<string>('MAILCOW_API_URL');
    const MAILCOW_API_KEY = this.configService.get<string>('MAILCOW_API_KEY');

    if (!MAILCOW_API_URL) {
      throw new Error('MAILCOW_API_URL is not set');
    }
    if (!MAILCOW_USERNAME) {
      throw new Error('MAILCOW_USERNAME is not set');
    }
    if (!MAILCOW_DOMAIN) {
      throw new Error('MAILCOW_DOMAIN is not set');
    }
    if (!MAILCOW_API_KEY) {
      throw new Error('MAILCOW_API_KEY is not set');
    }

    const data = {
      active: '1',
      address: email + '@' + MAILCOW_DOMAIN,
      goto: MAILCOW_USERNAME + '@' + MAILCOW_DOMAIN,
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

    return data;
  }

  initializeImap(keepAlive: boolean = false) {
    const IMAP_HOST = this.configService.get<string>('IMAP_HOST');
    const IMAP_PORT = this.configService.get<number>('IMAP_PORT');
    const IMAP_USERNAME = this.configService.get<string>('IMAP_USERNAME');
    const IMAP_PASSWORD = this.configService.get<string>('IMAP_PASSWORD');
    const IMAP_TLS = this.configService.get<boolean>('IMAP_TLS');

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

    return this.imap;
  }

  async readInbox(
    folder: string = 'INBOX',
    searchCriteria: any[] = ['ALL'],
  ): Promise<{ total: number; new: number; duplicates: number }> {
    const tracker = await lastValueFrom(
      this.settingsClient.send('emailContent.lastUID', {}),
    );

    const startUid = tracker ? tracker?._max?.uid + 1 : 1;

    console.log(tracker, startUid);

    return new Promise((resolve, reject) => {
      this.initializeImap();

      let stats = { total: 0, new: 0, duplicates: 0 };

      this.imap.once('ready', () => {
        this.logger.log('IMAP connection ready');

        this.imap.openBox(folder, false, (err, box) => {
          if (err) {
            reject(err);
            return;
          }

          this.logger.log(
            `Opened folder: ${folder}, Total messages: ${box.messages.total}`,
          );

          searchCriteria = [['UID', `${startUid}:*`]];

          this.imap.search(searchCriteria, (err, results) => {
            if (err) {
              reject(err);
              return;
            }

            if (!results || results.length === 0) {
              this.logger.log('No messages found');
              this.imap.end();
              resolve(stats);
              return;
            }

            stats.total = results.length;
            this.logger.log(`Found ${results.length} messages`);

            const fetch = this.imap.fetch(results, {
              bodies: '',
              struct: true,
            });

            fetch.on('message', (msg, seqno) => {
              let uid: number;

              msg.once('attributes', (attrs) => {
                uid = attrs.uid;
              });

              msg.on('body', (stream, info) => {
                simpleParser(stream as any)
                  .then(async (parsed) => {
                    const to = Array.isArray(parsed.to)
                      ? parsed.to[0]
                      : parsed.to;
                    const references = Array.isArray(parsed.references)
                      ? parsed.references[0]
                      : parsed.references;

                    if (
                      !to ||
                      !to.value ||
                      !to.value[0] ||
                      !to.value[0].address ||
                      !parsed.from ||
                      !parsed.from.value ||
                      !parsed.from.value[0] ||
                      !parsed.from.value[0].address ||
                      !parsed.messageId
                    ) {
                      return;
                    }

                    this.logger.log('to text', to?.text, uid);
                    if (uid < startUid) {
                      return;
                    }

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
                    const saved = await lastValueFrom(
                      this.settingsClient.send(
                        'emailContent.create',
                        insertData,
                      ),
                    );
                    if (saved) {
                      stats.new++;
                    } else {
                      stats.duplicates++;
                    }

                    // if (uid) {
                    //   this.imap.addFlags(uid, ['\\Seen'], (err) => {
                    //     if (err) {
                    //       this.logger.error(
                    //         `Failed to mark UID ${uid} as seen: ${err.message}`,
                    //       );
                    //     } else {
                    //       this.logger.debug(`Marked UID ${uid} as seen`);
                    //     }
                    //   });
                    // }
                  })
                  .catch((err) => {
                    this.logger.error(
                      `Error parsing message ${seqno}: ${err.message}`,
                    );
                  });
              });
            });

            fetch.once('error', (err) => {
              this.logger.error(`Fetch error: ${err.message}`);
              reject(err);
            });

            fetch.once('end', () => {
              this.logger.log('Finished fetching messages');
              this.imap.end();
            });
          });
        });
      });

      this.imap.once('error', (err) => {
        this.logger.error(`IMAP error: ${err.message}`);
        reject(err);
      });

      this.imap.once('end', () => {
        this.logger.log('IMAP connection ended');
        resolve(stats);
      });

      this.imap.connect();
    });
  }

  async readUnseenEmails(): Promise<{
    total: number;
    new: number;
    duplicates: number;
  }> {
    return this.readInbox('INBOX', ['UNSEEN']);
  }
}
