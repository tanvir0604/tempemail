import { Module } from '@nestjs/common';
import { MailcowController } from './mailcow.controller';
import { MailcowService } from './mailcow.service';
import { SettingsModule } from 'src/settings/settings.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getRabbitMqUrl } from '@repo/validation';

@Module({
  imports: [
    SettingsModule,
    ClientsModule.register([
      {
        name: 'MAILCOW_SERVICE',
        transport: Transport.RMQ,
        options: {
          url: getRabbitMqUrl(),
          queue: 'temp-email-mailcow-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [MailcowController],
  providers: [MailcowService],
  exports: [MailcowService],
})
export class MailcowModule {}
