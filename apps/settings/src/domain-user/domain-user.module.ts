import { Module } from '@nestjs/common';
import { DomainUserService } from './domain-user.service';
import { DomainUserController } from './domain-user.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [DomainUserController],
  providers: [DomainUserService],
})
export class DomainUserModule {}
