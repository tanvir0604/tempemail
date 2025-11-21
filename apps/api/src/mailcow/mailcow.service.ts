import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailcowService {
  constructor(private readonly httpService: HttpService) {}
  async createNewAlias() {
    const data = {
      active: '1',
      address: 'alias@domain.tld',
      goto: 'destination@domain.tld',
    };
  }
}
