import { Module } from '@nestjs/common';
import { TempEmailService } from './temp-email.service';
import { TempEmailController } from './temp-email.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  providers: [TempEmailService],
  controllers: [TempEmailController],
})
export class TempEmailModule {}
