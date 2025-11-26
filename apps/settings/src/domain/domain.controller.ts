import { Controller } from '@nestjs/common';
import { DomainService } from './domain.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDomainDto, FindAllDto, UpdateDomainDto } from '@repo/validation';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}
  @MessagePattern('domain.findAll')
  findAll(@Payload() { where, take, skip }: FindAllDto) {
    return this.domainService.findAll({ where, take, skip });
  }

  @MessagePattern('domain.findOne')
  findOne(@Payload() { where }: { where: {} }) {
    return this.domainService.findOne({
      where,
      include: { emailContents: true },
    });
  }

  @MessagePattern('domain.findById')
  async findById(@Payload() id: string) {
    return await this.domainService.findOne({
      where: { id },
      include: { emailContents: true },
    });
  }

  @MessagePattern('domain.create')
  async create(data: CreateDomainDto) {
    return await this.domainService.upsert(
      {
        domain: data.domain,
      },
      {
        domain: data.domain,
        apiUrl: data.apiUrl,
        apiKey: data.apiKey,
        imapHost: data.imapHost,
        imapPort: data.imapPort,
      },
    );
  }

  @MessagePattern('domain.update')
  async update(data: UpdateDomainDto) {
    return await this.domainService.update(
      { id: data.id },
      {
        domain: data.domain ?? undefined,
        apiUrl: data.apiUrl ?? undefined,
        apiKey: data.apiKey ?? undefined,
        imapHost: data.imapHost ?? undefined,
        imapPort: data.imapPort ?? undefined,
      },
    );
  }

  @MessagePattern('domain.delete')
  async delete(id: string) {
    return await this.domainService.delete({ id });
  }
}
