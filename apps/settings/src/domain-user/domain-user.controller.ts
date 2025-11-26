import { Controller } from '@nestjs/common';
import { DomainUserService } from './domain-user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateDomainUserDto,
  FindAllDto,
  UpdateDomainUserDto,
} from '@repo/validation';

@Controller('domain-user')
export class DomainUserController {
  constructor(private readonly domainUserService: DomainUserService) {}
  @MessagePattern('domainUser.findAll')
  findAll(@Payload() { where, take, skip }: FindAllDto) {
    return this.domainUserService.findAll({ where, take, skip });
  }

  @MessagePattern('domainUser.findOne')
  findOne(@Payload() { where }: { where: {} }) {
    return this.domainUserService.findOne({
      where,
      include: { emailContents: true },
    });
  }

  @MessagePattern('domainUser.findById')
  async findById(@Payload() id: string) {
    return await this.domainUserService.findOne({
      where: { id },
      include: { emailContents: true },
    });
  }

  @MessagePattern('domainUser.create')
  async create(data: CreateDomainUserDto) {
    return await this.domainUserService.create({
      domain: { connect: { email: data.domainId } },
      apiUserName: data.apiUserName,
      apiPassword: data.apiPassword,
      imapUserName: data.imapUserName,
      imapPassword: data.imapPassword,
    });
  }

  @MessagePattern('domainUser.update')
  async update(data: UpdateDomainUserDto) {
    return await this.domainUserService.update(
      { id: data.id },
      {
        domain: data.domainId
          ? { connect: { email: data.domainId } }
          : undefined,
        apiUserName: data.apiUserName ?? undefined,
        apiPassword: data.apiPassword ?? undefined,
        imapUserName: data.imapUserName ?? undefined,
        imapPassword: data.imapPassword ?? undefined,
      },
    );
  }

  @MessagePattern('domainUser.delete')
  async delete(id: string) {
    return await this.domainUserService.delete({ id });
  }
}
