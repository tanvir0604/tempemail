import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getRabbitMqUrl } from '@repo/validation';

@Module({
  imports: [
    CacheModule.register(),
    ClientsModule.register([
      {
        name: 'BLOG_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [getRabbitMqUrl()],
          queue: 'temp-email-blog-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
