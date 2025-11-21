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
    return this.emailContentService.findAll({ where, take, skip });
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
    return await this.emailContentService.create({
      tempEmailId: data.tempEmailId,
      content: data.content,
    });
  }

  @MessagePattern('emailContent.update')
  async update(data: UpdateEmailContentDto) {
    return await this.emailContentService.update(
      { id: data.id },
      { tempEmailId: data.tempEmailId, content: data.content },
    );
  }

  @MessagePattern('emailContent.delete')
  async delete(id: string) {
    return await this.emailContentService.delete({ id });
  }
}
