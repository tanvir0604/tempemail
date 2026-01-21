import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SettingsModule } from 'src/settings/settings.module';
import { getRabbitMqUrl } from '@repo/validation';

@Module({
  imports: [
    SettingsModule,
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [getRabbitMqUrl()],
          queue: 'temp-email-email-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
