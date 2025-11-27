import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MailcowService } from './mailcow.service';
import { TempEmailService } from 'src/settings/temp-email/temp-email.service';
import { CreateMailCowAliasDto, SimpleResponseType } from '@repo/validation';

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
  async createNewAlias(
    @Body() data: CreateMailCowAliasDto,
  ): Promise<SimpleResponseType> {
    // select domain

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: null,
    };
  }
}
