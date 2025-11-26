import { Module } from '@nestjs/common';
import { DomainUserService } from './domain-user.service';
import { DomainController } from 'src/domain/domain.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [DomainController],
  providers: [DomainUserService],
})
export class DomainUserModule {}
