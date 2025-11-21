import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { BaseService } from '@repo/nest';

@Injectable()
export class EmailContentService extends BaseService<
  PrismaService['emailContent']
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.emailContent);
  }
}
