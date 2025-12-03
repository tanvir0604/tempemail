import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendEmailDto } from '@repo/validation';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('send')
  send(@Payload() data: SendEmailDto) {
    return this.appService.send(data);
  }
}
