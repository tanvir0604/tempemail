import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { BaseService } from '@repo/nest';

@Injectable()
export class AppService extends BaseService<PrismaService['post']> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.post);
  }
}
