import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateMailCowAliasDto,
  CreateMailCowAliasSchema,
} from '@repo/validation';
import { DomainService } from './settings/domain/domain.service';
import { MailcowService } from './mailcow/mailcow.service';
import { TempEmailService } from './settings/temp-email/temp-email.service';
import { ZodValidationPipe } from './pipes/jod.validation.pipe';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly domainService: DomainService,
    private readonly mailcowService: MailcowService,
    private readonly tempEmailService: TempEmailService,
  ) {}

  @Post('/create-alias')
  @UsePipes(new ZodValidationPipe(CreateMailCowAliasSchema))
  async createAlias(@Body() data: CreateMailCowAliasDto) {
    if (data && data.domain) {
      const response = await this.domainService.findOne({
        where: { domain: data.domain },
      });
      if (!response) {
        throw new BadRequestException();
      }
    } else {
      const response = await this.domainService.getList({
        take: 10,
        skip: 0,
      });
      if (!response || response.length == 0) {
        throw new BadRequestException();
      }
      const index = Math.floor(Math.random() * response.length);
      data.domain = response[index].domain;
    }

    const mailCowResponse = await this.mailcowService.createNewAlias(data);

    console.log('mailCowResponse', mailCowResponse);

    const response = await this.tempEmailService.create({
      email: mailCowResponse,
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
