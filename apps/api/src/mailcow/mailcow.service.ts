import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateMailCowAliasDto,
  ExpiredAliasesGroupType,
  firstNames,
  lastNames,
} from '@repo/validation';
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
    const n = Math.floor(Math.random() * 900 + 100);

    if (style > 0.7) return `${f}${l}`.toLowerCase();
    if (style > 0.4) return `${f}.${l}`.toLowerCase();
    if (style > 0.2) return `${f}_${l}${n}`.toLowerCase();
    return `${f}${l}${n}`.toLowerCase();
  }

  generateRealisticEmail(): string {
    const f = firstNames[Math.floor(Math.random() * firstNames.length)];
    const l = lastNames[Math.floor(Math.random() * lastNames.length)];
    const style = Math.random();

    const birthYear = Math.floor(Math.random() * 35) + 1970;

    const num = Math.floor(Math.random() * 999) + 1;

    if (style > 0.7) {
      return `${f}.${l}${birthYear}`.toLowerCase();
    } else if (style > 0.5) {
      return `${f}${l}${birthYear}`.toLowerCase();
    } else if (style > 0.3) {
      return `${f}.${l}.${num}`.toLowerCase();
    } else if (style > 0.15) {
      return `${f}_${l}${birthYear % 100}`.toLowerCase();
    } else {
      return `${f}${l}${num}`.toLowerCase();
    }
  }

  async generateUniqueEmailUsername(data?: CreateMailCowAliasDto) {
    if (!data || !data.domain) {
      throw new Error('domain is required');
    }

    if (!data.alias) {
      data.alias = this.generateEmailUsername();
    }

    const email = data.alias + '@' + data.domain;

    // check uniqueness
    const res = await this.tempEmailService.getDetails({
      where: { email: email },
    });
    if (!res) {
      return email;
    }
    data.alias = this.generateEmailUsername();
    return this.generateUniqueEmailUsername();
  }
  async createNewAlias(data: CreateMailCowAliasDto) {
    const email = await this.generateUniqueEmailUsername(data);
    const response = await firstValueFrom(
      this.mailCowClient.send('mailcow.createNewAlias', email),
    );
    return response;
  }

  async deleteAlias(data: ExpiredAliasesGroupType) {
    const response = await firstValueFrom(
      this.mailCowClient.send('mailcow.deleteAlias', data),
    );
    return response;
  }

  async sync() {
    this.mailCowClient.emit('mailcow.sync', {});
  }
}
