import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateTempEmailDto,
  FindAllDto,
  UpdateTempEmailDto,
} from '@repo/validation';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TempEmailService {
  constructor(
    @Inject('SETTINGS_SERVICE')
    private readonly settingsClient: ClientProxy,
  ) {}
  async getList(params: FindAllDto) {
    return await lastValueFrom(
      this.settingsClient.send('tempEmail.findAll', params),
    );
  }

  async getDetails(data: { where: {} }) {
    return await lastValueFrom(
      this.settingsClient.send('tempEmail.findOne', data),
    );
  }

  async getDetailsById(id: string) {
    return await lastValueFrom(
      this.settingsClient.send('tempEmail.findById', id),
    );
  }

  async create(data: CreateTempEmailDto) {
    return await lastValueFrom(
      this.settingsClient.send('tempEmail.create', data),
    );
  }

  async update(data: UpdateTempEmailDto) {
    return await lastValueFrom(
      this.settingsClient.send('tempEmail.update', data),
    );
  }

  async delete(id: string) {
    return await lastValueFrom(
      this.settingsClient.send('tempEmail.delete', id),
    );
  }
}
