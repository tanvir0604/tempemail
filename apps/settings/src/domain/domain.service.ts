import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { BaseService } from '@repo/nest';

@Injectable()
export class DomainService extends BaseService<PrismaService['domain']> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.domain);
  }
}
