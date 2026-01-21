import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateImapConnectionDto } from '@repo/validation';
import { ImapFlow } from 'imapflow';

@Injectable()
export class ImapFlowService {
  private logger = new Logger(ImapFlowService.name);

  constructor(
    @Inject('MAILCOW_SERVICE') private readonly mailcowClient: ClientProxy,
  ) {}

  /**
   * Called externally to start IMAP listeners
   */
  async startForAccounts(accounts: CreateImapConnectionDto[]) {
    for (const acc of accounts) {
      await this.createClient(acc);
    }
  }

  /**
   * Create IMAP client for a single account
   */
  async createClient(account: CreateImapConnectionDto) {
    const client = new ImapFlow({
      host: account.host,
      port: account.port ?? 993,
      secure: true,
      auth: {
        user: account.username,
        pass: account.password,
      },
      logger: false,
    });

    client.on('close', () => {
      this.logger.warn(
        `IMAP disconnected: ${account.username}, reconnecting...`,
      );
      setTimeout(() => this.createClient(account), 5000);
    });

    client.on('exists', async () => {
      this.logger.log(`New email for: ${account.username}`);
      await this.fetchLatestEmail(client, account.username);
    });

    const respose = await this.connectWithRetry(client);

    if (!respose) {
      return;
    }
    await client.mailboxOpen('INBOX');

    this.logger.log(`IMAP connected for: ${account.username}`);
  }

  async connectWithRetry(client: ImapFlow, retries = 3, delayMs = 5000) {
    for (let i = 0; i < retries; i++) {
      try {
        await client.connect();
        this.logger.log('IMAP connected!');
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : JSON.stringify(err, null, 2);
        this.logger.error(
          `IMAP connection failed (${i + 1}/${retries}):`,
          err.message,
        );
        // await new Promise((res) => setTimeout(res, delayMs));

        if (i < retries - 1) {
          const delay = delayMs * Math.pow(2, i);
          this.logger.log(`Retrying in ${delay}ms...`);
          await new Promise((res) => setTimeout(res, delay));
        }
      }
    }
    this.logger.error('IMAP connection failed after retries');
    return false;
  }

  /**
   * Fetch newest email for a specific client
   */
  private async fetchLatestEmail(client: ImapFlow, user: string) {
    const lock = await client.getMailboxLock('INBOX');
    try {
      const mailbox = client.mailbox;
      if (!mailbox) {
        this.logger.error('No mailbox is currently selected.');
        return null;
      }
      const seq = mailbox.exists;

      if (!seq) {
        this.logger.error('No sequence found.');
        return null;
      }

      const msg = await client.fetchOne(seq, {
        uid: true,
        source: true,
        envelope: true,
      });

      if (!msg) {
        this.logger.error('No mail found.');
        return null;
      }

      this.logger.log(`Sending Email for ${user} for processing...`);

      this.mailcowClient.emit('mailcow.processEmailContent', {
        source: msg.source?.toString('utf-8') ?? '',
        uid: msg.uid,
      });
    } finally {
      lock.release();
    }
  }
}
