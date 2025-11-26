import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { TempEmailController } from './temp-email/temp-email.controller';
import { TempEmailService } from './temp-email/temp-email.service';
import { EmailContentController } from './email-content/email-content.controller';
import { EmailContentService } from './email-content/email-content.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DomainController } from './domain/domain.controller';
import { DomainService } from './domain/domain.service';
import { DomainUserService } from './domain-user/domain-user.service';
import { DomainUserController } from './domain-user/domain-user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SETTINGS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'temp-email-settings-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [
    SettingsController,
    TempEmailController,
    EmailContentController,
    DomainController,
    DomainUserController,
  ],
  providers: [
    TempEmailService,
    EmailContentService,
    DomainService,
    DomainUserService,
  ],
  exports: [TempEmailService, DomainService],
})
export class SettingsModule {}
