import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateDomainDto, FindAllDto, UpdateDomainDto } from '@repo/validation';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DomainService {
  constructor(
    @Inject('SETTINGS_SERVICE')
    private readonly settingsClient: ClientProxy,
  ) {}
  async getList(params: FindAllDto) {
    return await lastValueFrom(
      this.settingsClient.send('domain.findAll', params),
    );
  }

  async findOne(params: { where: {} }) {
    return await lastValueFrom(
      this.settingsClient.send('domain.findOne', params),
    );
  }

  async getDetails(id: string) {
    return await lastValueFrom(this.settingsClient.send('domain.findById', id));
  }

  async getDetailsById(id: string) {
    return await lastValueFrom(this.settingsClient.send('domain.findById', id));
  }

  async create(data: CreateDomainDto) {
    return await lastValueFrom(this.settingsClient.send('domain.create', data));
  }

  async update(data: UpdateDomainDto) {
    return await lastValueFrom(this.settingsClient.send('domain.update', data));
  }

  async delete(id: string) {
    return await lastValueFrom(this.settingsClient.send('domain.delete', id));
  }
}
