import { Module } from '@nestjs/common';
import { ImapFlowService } from './imap-flow.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getRabbitMqUrl } from '@repo/validation';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAILCOW_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [getRabbitMqUrl()],
          queue: 'temp-email-mailcow-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [ImapFlowService],
  exports: [ImapFlowService],
})
export class ImapFlowModule {}
