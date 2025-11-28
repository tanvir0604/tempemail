import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SimpleResponseType } from '@repo/validation';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('/file/:filename')
  async getFile(
    @Param('filename') filename: string,
  ): Promise<SimpleResponseType> {
    const file = await this.settingsService.getFile(filename);
    if (!file) {
      throw new NotFoundException();
    }
    return {
      statusCode: 200,
      message: 'File found',
      data: file,
    };
  }
}
