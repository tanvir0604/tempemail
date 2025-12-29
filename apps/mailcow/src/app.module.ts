import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ImapFlowModule } from '@app/imap-flow';
import { getRabbitMqUrl } from '@repo/validation';

@Module({
  imports: [
    HttpModule,
    ImapFlowModule,
    ConfigModule.forRoot({ isGlobal: true }),
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
