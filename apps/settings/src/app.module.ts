import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TempEmailModule } from './temp-email/temp-email.module';
import { EmailContentModule } from './email-content/email-content.module';
import { PrismaModule } from '@app/prisma';
import { ConfigModule } from '@nestjs/config';
import { DomainModule } from './domain/domain.module';
import { EmailUserService } from './email-user/email-user.service';
import { EmailUserModule } from './email-user/email-user.module';
import { DomainUserController } from './domain-user/domain-user.controller';
import { DomainUserModule } from './domain-user/domain-user.module';

@Module({
  imports: [
    TempEmailModule,
    EmailContentModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DomainModule,
    EmailUserModule,
    DomainUserModule,
  ],
  controllers: [AppController, DomainUserController],
  providers: [AppService, EmailUserService],
})
export class AppModule {}
