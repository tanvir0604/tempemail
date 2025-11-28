import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SettingsService {
  constructor(
    @Inject('SETTINGS_SERVICE') private readonly settingsClient: ClientProxy,
  ) {}
  async getFile(filename: string) {
    return await lastValueFrom(
      this.settingsClient.send('settings.downloadFile', { filename }),
    );
  }
}
