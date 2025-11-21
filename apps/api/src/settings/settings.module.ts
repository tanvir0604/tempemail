import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { TempEmailController } from './temp-email/temp-email.controller';
import { TempEmailService } from './temp-email/temp-email.service';
import { EmailContentController } from './email-content/email-content.controller';
import { EmailContentService } from './email-content/email-content.service';

@Module({
  controllers: [SettingsController, TempEmailController, EmailContentController],
  providers: [TempEmailService, EmailContentService]
})
export class SettingsModule {}
