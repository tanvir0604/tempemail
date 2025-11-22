import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('mailcow.createNewAlias')
  createNewAlias(@Payload() email: string) {
    return this.appService.createNewAlias(email);
  }

  @EventPattern('mailcow.sync')
  sync() {
    // return this.appService.readInbox();
    return this.appService.readUnseenEmails();
  }
}
