import { BadRequestException, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { DomainType, ExpiredAliasesGroupType } from '@repo/validation';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('mailcow.createNewAlias')
  async createNewAlias(@Payload() email: string) {
    // console.log('email', email);
    const domainInfo: DomainType = await this.appService.getDomainInfo(
      email.split('@')[1],
    );
    if (!domainInfo || domainInfo.domainUsers.length === 0) {
      console.log('No domain found');
      return null;
    }
    const randomIndex = Math.floor(
      Math.random() * domainInfo.domainUsers.length,
    );
    const selectedDomainUser = domainInfo.domainUsers[randomIndex];
    const response = await this.appService.createNewAlias({
      username: selectedDomainUser.username,
      email: email,
      apiUrl: domainInfo.apiUrl,
      apiKey: domainInfo.apiKey,
    });

    return {
      domainUserId: selectedDomainUser.id,
      email: response?.email,
      emailId: response?.emailId,
    };
  }

  @MessagePattern('mailcow.deleteAlias')
  async deleteAlias(@Payload() data: ExpiredAliasesGroupType) {
    const domainInfo: DomainType = await this.appService.getDomainInfo(
      data.domain,
    );
    if (!domainInfo || domainInfo.domainUsers.length === 0) {
      return null;
    }
    return await this.appService.deleteAlias({
      ids: data.ids,
      apiUrl: domainInfo.apiUrl,
      apiKey: domainInfo.apiKey,
    });
  }

  @EventPattern('mailcow.processEmailContent')
  async processEmailContent(@Payload() data: { source: string; uid: number }) {
    await this.appService.processEmailContent(data);
  }
}
