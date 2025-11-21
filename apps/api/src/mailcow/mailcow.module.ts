import { Module } from '@nestjs/common';
import { MailcowController } from './mailcow.controller';
import { MailcowService } from './mailcow.service';

@Module({
  controllers: [MailcowController],
  providers: [MailcowService]
})
export class MailcowModule {}
