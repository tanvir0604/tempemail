import { Module } from '@nestjs/common';
import { EmailContentService } from './email-content.service';
import { EmailContentController } from './email-content.controller';

@Module({
  providers: [EmailContentService],
  controllers: [EmailContentController]
})
export class EmailContentModule {}
