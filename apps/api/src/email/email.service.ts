import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendEmailDto } from '@repo/validation';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EmailService {
  constructor(@Inject('EMAIL_SERVICE') private emailClient: ClientProxy) {}

  async send(data: SendEmailDto) {
    return await lastValueFrom(this.emailClient.send('email.send', data));
  }
}
