import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  DomainType,
  DomainUserType,
  EmailConfigType,
  SendEmailDto,
  TempEmailType,
} from '@repo/validation';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('email.send')
  async send(@Payload() data: SendEmailDto) {
    const domainInfo: DomainType = await this.appService.getDomainInfo(
      data.from.split('@')[1],
    );
    if (!domainInfo || domainInfo.domainUsers.length === 0) {
      console.log('No domain found');
      return null;
    }

    const tempEmailInfo: TempEmailType = await this.appService.getTempEmailInfo(
      data.from,
    );
    if (!tempEmailInfo) {
      console.log('No from email found');
      return null;
    }

    // console.log(domainInfo, tempEmailInfo);

    const domainUser: DomainUserType | undefined = domainInfo.domainUsers.find(
      (u) => u.id === tempEmailInfo.domainUserId,
    );

    if (!domainUser) {
      console.log('No domain user found');
      return null;
    }

    const config: EmailConfigType = {
      host: domainInfo.smtpHost,
      port: domainInfo.smtpPort,
      secure: domainInfo.smtpSecure,
      user: domainUser.username,
      pass: domainUser.password,
    };
    return this.appService.init(config).send(data);
  }
}
