import { Controller, Logger } from '@nestjs/common';
import { EmailContentService } from './email-content.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
const fs = require('fs');
import {
  CreateEmailContentDto,
  FindAllDto,
  sanitize,
  UpdateEmailContentDto,
} from '@repo/validation';

@Controller('email-content')
export class EmailContentController {
  constructor(private readonly emailContentService: EmailContentService) {}
  private readonly logger = new Logger(EmailContentController.name);
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
    data.subject = sanitize(data.subject ?? '');
    data.text = sanitize(data.text ?? '');
    data.html = sanitize(data.html ?? '');
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
        uid: data.uid ?? 0,
      },
    );
  }

  @EventPattern('emailContent.createEvent')
  async createEvent(data: CreateEmailContentDto) {
    data.subject = sanitize(data.subject ?? '');
    data.text = sanitize(data.text ?? '');
    data.html = sanitize(data.html ?? '');

    let attachments = [];
    if (data.attachments && data.attachments.length > 0) {
      this.logger.log(data.attachments.length + ' attachments');
      attachments = data.attachments.map((item: any) => {
        if (!fs.existsSync('./uploads')) {
          fs.mkdirSync('./uploads');
        }
        fs.writeFileSync(
          `./uploads/${item.filename}`,
          Buffer.from(item.content.data, 'base64'),
        );
        return {
          filename: item.filename,
          path: `./uploads/${item.filename}`,
          contentType: item.contentType,
          size: item.size,
        };
      });
    }

    this.emailContentService.upsert(
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
        uid: data.uid ?? 0,
        attachments: attachments.length > 0 ? attachments : undefined,
      },
    );
  }

  @MessagePattern('emailContent.update')
  async update(data: UpdateEmailContentDto) {
    data.subject = sanitize(data.subject ?? '');
    data.text = sanitize(data.text ?? '');
    data.html = sanitize(data.html ?? '');
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
