import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly filesPath = join(process.cwd(), 'uploads');

  @MessagePattern('settings.downloadFile')
  async downloadFile(@Payload() data: { filename: string }) {
    const { filename } = data;
    const sanitizedFilename = filename.replace(/\.\./g, '');
    const filePath = join(this.filesPath, sanitizedFilename);

    if (!existsSync(filePath)) {
      return false;
    }

    try {
      const fileBuffer = await readFile(filePath);

      return {
        success: true,
        filename: filename,
        data: fileBuffer.toString('base64'),
        size: fileBuffer.length,
      };
    } catch (error) {
      return false;
    }
  }
}
