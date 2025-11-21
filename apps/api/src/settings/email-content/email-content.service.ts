import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateEmailContentDto,
  FindAllDto,
  UpdateEmailContentDto,
} from '@repo/validation';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EmailContentService {
  constructor(
    @Inject('SETTINGS_SERVICE')
    private readonly settingsClient: ClientProxy,
  ) {}
  async getList(params: FindAllDto) {
    return await lastValueFrom(
      this.settingsClient.send('emailContent.findAll', params),
    );
  }

  async getDetails(id: string) {
    return await lastValueFrom(
      this.settingsClient.send('emailContent.findById', id),
    );
  }

  async create(data: CreateEmailContentDto) {
    return await lastValueFrom(
      this.settingsClient.send('emailContent.create', data),
    );
  }

  async update(data: UpdateEmailContentDto) {
    return await lastValueFrom(
      this.settingsClient.send('emailContent.update', data),
    );
  }

  async delete(id: string) {
    return await lastValueFrom(
      this.settingsClient.send('emailContent.delete', id),
    );
  }
}
