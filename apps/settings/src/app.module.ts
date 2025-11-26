import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TempEmailModule } from './temp-email/temp-email.module';
import { EmailContentModule } from './email-content/email-content.module';
import { PrismaModule } from '@app/prisma';
import { ConfigModule } from '@nestjs/config';
import { DomainModule } from './domain/domain.module';
import { DomainUserModule } from './domain-user/domain-user.module';

@Module({
  imports: [
    PrismaModule,
    TempEmailModule,
    EmailContentModule,
    DomainModule,
    DomainUserModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
