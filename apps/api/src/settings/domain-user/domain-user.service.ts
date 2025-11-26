import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateDomainUserDto,
  FindAllDto,
  UpdateDomainUserDto,
} from '@repo/validation';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DomainUserService {
  constructor(
    @Inject('SETTINGS_SERVICE')
    private readonly settingsClient: ClientProxy,
  ) {}
  async getList(params: FindAllDto) {
    return await lastValueFrom(
      this.settingsClient.send('domainUser.findAll', params),
    );
  }

  async getDetails(id: string) {
    return await lastValueFrom(
      this.settingsClient.send('domainUser.findById', id),
    );
  }

  async getDetailsById(id: string) {
    return await lastValueFrom(
      this.settingsClient.send('domainUser.findById', id),
    );
  }

  async create(data: CreateDomainUserDto) {
    return await lastValueFrom(
      this.settingsClient.send('domainUser.create', data),
    );
  }

  async update(data: UpdateDomainUserDto) {
    return await lastValueFrom(
      this.settingsClient.send('domainUser.update', data),
    );
  }

  async delete(id: string) {
    return await lastValueFrom(
      this.settingsClient.send('domainUser.delete', id),
    );
  }
}
