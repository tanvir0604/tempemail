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
    private readonly domainService: DomainService,
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
    if (data.domain == null) {
      const domain = await this.tempEmailService.findOne();
    }

    const mailCowResponse: any = await this.mailcowService.createNewAlias(data);
    // store email in db
    const response = await this.tempEmailService.create({
      email: mailCowResponse.address,
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
