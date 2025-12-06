import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateMailCowAliasDto,
  CreateMailCowAliasSchema,
  CreateTempEmailDto,
  ExpiredAliasesGroupType,
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
    if (!data.userId) {
      throw new BadRequestException("Please don't use incognito mood!!");
    }

    let waitTill = new Date();
    if (data && data.userId) {
      const response = await this.tempEmailService.getList({
        where: {
          userId: data.userId,
          createdAt: { gt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
        skip: 0,
      });
      if (!response) {
        throw new BadRequestException('Can not find alias list');
      }

      if (response.length > 10) {
        waitTill = new Date(
          new Date(response[0].createdAt).getTime() + 2 * 60 * 60 * 1000,
        );
      }

      if (response.length > 0) {
        waitTill = new Date(
          new Date(response[0].createdAt).getTime() +
            (response.length / 10) * 60 * 60 * 1000,
        );
      }
    }

    if (data && data.domain) {
      const response = await this.domainService.findOne({
        where: { domain: data.domain },
      });
      if (!response) {
        throw new BadRequestException('Can not find domain');
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

    const mailCowResponse: CreateTempEmailDto =
      await this.mailcowService.createNewAlias(data);

    console.log('mailCowResponse', mailCowResponse);

    if (!mailCowResponse) {
      throw new BadRequestException("Can't create alias");
    }

    const response = await this.tempEmailService.create({
      email: mailCowResponse.email,
      emailId: mailCowResponse.emailId,
      expiredMinutes: 30,
      userId: data.userId,
    });

    // console.log('response', response);

    if (!response) {
      throw new BadRequestException("Can't save to database");
    }

    response.waitTill = waitTill;

    // console.log('return response', response);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: response,
    };
  }

  @Get('/delete-alias')
  async deleteAlias() {
    // get expired alias
    const hoursAgo = Date.now() - 24 * 60 * 60 * 1000; // 24 hours
    const expiredAliases = await this.tempEmailService.getList({
      where: {
        expiredAt: {
          lte: new Date(hoursAgo),
        },
      },
      take: 100,
      skip: 0,
    });

    if (!expiredAliases) {
      throw new NotFoundException();
    }

    const ids: string[] = [];

    const result: ExpiredAliasesGroupType[] = Object.entries(
      expiredAliases.reduce((acc: any, item: any) => {
        const domain = item.email.split('@')[1];
        (acc[domain] ??= []).push(item.emailId);
        return acc;
      }, {}),
    ).map(([domain, ids]) => ({ domain, ids })) as ExpiredAliasesGroupType[];

    let total = 0;

    for (const item of result) {
      const response = await this.mailcowService.deleteAlias(item);
      if (!response) continue;

      const response2 = await this.tempEmailService.deleteMany({
        where: { emailId: { in: item.ids } },
      });
      if (!response2) continue;

      total += response2.count ?? 0;

      // console.log('response2', response2);
    }

    return {
      statusCode: HttpStatus.OK,
      message: total + ' aliases deleted',
      data: {},
    };
  }
}
