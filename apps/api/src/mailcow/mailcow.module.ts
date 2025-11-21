import { Module } from '@nestjs/common';
import { MailcowController } from './mailcow.controller';
import { MailcowService } from './mailcow.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MailcowController],
  providers: [MailcowService],
})
export class MailcowModule {}
