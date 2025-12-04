import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailcowModule } from './mailcow/mailcow.module';
import { SettingsModule } from './settings/settings.module';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    MailcowModule,
    SettingsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BlogModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
