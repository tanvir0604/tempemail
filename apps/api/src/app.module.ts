import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailcowModule } from './mailcow/mailcow.module';
import { SettingsService } from './settings/settings.service';
import { SettingsModule } from './settings/settings.module';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { MailcowService } from './mailcow/mailcow.service';

@Module({
  imports: [
    MailcowModule,
    SettingsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
