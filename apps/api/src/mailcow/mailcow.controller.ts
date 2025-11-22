import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MailcowService } from './mailcow.service';
import { TempEmailService } from 'src/settings/temp-email/temp-email.service';
import { SimpleResponseType } from '@repo/validation';

@Controller('mailcow')
export class MailcowController {
  constructor(
    private readonly mailcowService: MailcowService,
    private readonly tempEmailService: TempEmailService,
  ) {}

  @Get('/sync')
  sync() {
    return this.mailcowService.sync();
  }

  @Post()
  async createNewAlias(): Promise<SimpleResponseType> {
    const data: any = await this.mailcowService.createNewAlias();
    // store email in db
    const response = await this.tempEmailService.create({
      email: data.address,
      expiredMinutes: 30,
    });

    if (!response) {
      throw new BadRequestException();
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: response,
    };
  }
}
