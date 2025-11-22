import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstNames, lastNames } from '@repo/validation';
import { firstValueFrom } from 'rxjs';
import { TempEmailService } from 'src/settings/temp-email/temp-email.service';

@Injectable()
export class MailcowService {
  constructor(
    @Inject('MAILCOW_SERVICE') private readonly mailCowClient: ClientProxy,
    private readonly tempEmailService: TempEmailService,
  ) {}

  generateEmailUsername() {
    const f = firstNames[Math.floor(Math.random() * firstNames.length)];
    const l = lastNames[Math.floor(Math.random() * lastNames.length)];
    const style = Math.random();
    const n = Math.floor(Math.random() * 900 + 100); // 100–999 for realism

    if (style > 0.7) return `${f}${l}`.toLowerCase();
    if (style > 0.4) return `${f}.${l}`.toLowerCase();
    if (style > 0.2) return `${f}_${l}${n}`.toLowerCase();
    return `${f}${l}${n}`.toLowerCase();
  }

  async generateUniqueEmailUsername() {
    const email = this.generateEmailUsername();
    // check uniqueness
    const res = await this.tempEmailService.getDetails({
      where: { email: email },
    });
    if (!res) {
      return email;
    }
    return this.generateUniqueEmailUsername();
  }
  async createNewAlias() {
    const email = await this.generateUniqueEmailUsername();

    const data = await firstValueFrom(
      this.mailCowClient.send('mailcow.createNewAlias', email),
    );
    return data;
  }

  async sync() {
    this.mailCowClient.emit('mailcow.sync', {});
  }
}
