import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailcowModule } from './mailcow/mailcow.module';
import { SettingsService } from './settings/settings.service';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [MailcowModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService, SettingsService],
})
export class AppModule {}
