import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TempEmailModule } from './temp-email/temp-email.module';
import { EmailContentModule } from './email-content/email-content.module';

@Module({
  imports: [TempEmailModule, EmailContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
