import { Controller } from '@nestjs/common';
import { EmailContentService } from './email-content.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateEmailContentDto,
  FindAllDto,
  UpdateEmailContentDto,
} from '@repo/validation';

@Controller('email-content')
export class EmailContentController {
  constructor(private readonly emailContentService: EmailContentService) {}
  @MessagePattern('emailContent.findAll')
  findAll(@Payload() { where, take, skip }: FindAllDto) {
    return this.emailContentService.findAll({
      where,
      take,
      skip,
      orderBy: { createdAt: 'desc' },
    });
  }

  @MessagePattern('emailContent.findOne')
  findOne(@Payload() { where }: { where: {} }) {
    return this.emailContentService.findOne({
      where,
    });
  }

  @MessagePattern('emailContent.findById')
  async findById(@Payload() id: string) {
    console.log(id);
    return await this.emailContentService.findOne({
      where: { id },
    });
  }

  @MessagePattern('emailContent.create')
  async create(data: CreateEmailContentDto) {
    return await this.emailContentService.upsert(
      { messageId: data.messageId },
      {},
      {
        content: data.content,
        to: data.to,
        from: data.from,
        fromName: data.fromName,
        subject: data.subject,
        text: data.text,
        html: data.html,
        messageId: data.messageId,
        references: data.references,
        tempEmail: { connect: { email: data.tempEmailRef } },
        uid: data.uid,
      },
    );
  }

  @MessagePattern('emailContent.update')
  async update(data: UpdateEmailContentDto) {
    return await this.emailContentService.update(
      { id: data.id },
      {
        tempEmailRef: data.tempEmailRef ?? undefined,
        content: data.content ?? undefined,
        messageId: data.messageId ?? undefined,
        references: data.references ?? undefined,
      },
    );
  }

  @MessagePattern('emailContent.delete')
  async delete(id: string) {
    return await this.emailContentService.delete({ id });
  }

  @MessagePattern('emailContent.lastUID')
  async lastUID() {
    return await this.emailContentService.aggregate({
      _max: { uid: true },
    });
  }
}
