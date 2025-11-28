import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ImapFlowModule } from '@app/imap-flow';

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
          urls: ['amqp://localhost:5672'],
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
