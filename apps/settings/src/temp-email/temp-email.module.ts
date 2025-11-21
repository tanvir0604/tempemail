import { Module } from '@nestjs/common';
import { TempEmailService } from './temp-email.service';
import { TempEmailController } from './temp-email.controller';

@Module({
  providers: [TempEmailService],
  controllers: [TempEmailController]
})
export class TempEmailModule {}
