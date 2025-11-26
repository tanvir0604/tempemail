import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { BaseService } from '@repo/nest';

@Injectable()
export class DomainUserService extends BaseService<
  PrismaService['domainUser']
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.domainUser);
  }
}
