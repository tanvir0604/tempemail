import { Controller } from '@nestjs/common';
import { TempEmailService } from './temp-email.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateTempEmailDto,
  FindAllDto,
  UpdateTempEmailDto,
} from '@repo/validation';

@Controller('temp-email')
export class TempEmailController {
  constructor(private readonly tempEmailService: TempEmailService) {}
  @MessagePattern('tempEmail.findAll')
  findAll(@Payload() { where, take, skip }: FindAllDto) {
    return this.tempEmailService.findAll({ where, take, skip });
  }

  @MessagePattern('tempEmail.findOne')
  findOne(@Payload() { where }: { where: {} }) {
    console.log('findOne', where);
    return this.tempEmailService.findOne({
      where,
      include: { emailContents: true },
    });
  }

  @MessagePattern('tempEmail.findById')
  async findById(@Payload() id: string) {
    return await this.tempEmailService.findOne({
      where: { id },
      include: { emailContents: true },
    });
  }

  @MessagePattern('tempEmail.create')
  async create(data: CreateTempEmailDto) {
    let expiredMinutes = 10;
    if (data.expiredMinutes) {
      expiredMinutes = data.expiredMinutes;
    }

    console.log('expiredMinutes', expiredMinutes, data);
    return await this.tempEmailService.upsert(
      {
        email: data.email,
      },
      {
        email: data.email,
        expiredAt: new Date(Date.now() + expiredMinutes * 60 * 1000),
      },
    );
  }

  @MessagePattern('tempEmail.update')
  async update(data: UpdateTempEmailDto) {
    return await this.tempEmailService.update(
      { id: data.id },
      {
        email: data.email,
        expiredAt: data.expiredMinutes
          ? new Date(Date.now() + data.expiredMinutes * 60 * 1000)
          : undefined,
      },
    );
  }

  @MessagePattern('tempEmail.delete')
  async delete(id: string) {
    return await this.tempEmailService.delete({ id });
  }
}
