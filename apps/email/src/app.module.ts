import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getRabbitMqUrl } from '@repo/validation';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SETTINGS_SERVICE',
        transport: Transport.RMQ,
        options: {
          url: getRabbitMqUrl(),
          queue: 'temp-email-settings-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
