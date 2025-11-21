import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { BaseService } from '@repo/nest';

@Injectable()
export class TempEmailService extends BaseService<PrismaService['tempEmail']> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.tempEmail);
  }
}
