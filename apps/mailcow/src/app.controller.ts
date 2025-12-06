import { BadRequestException, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ExpiredAliasesGroupType } from '@repo/validation';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('mailcow.createNewAlias')
  async createNewAlias(@Payload() email: string) {
    // console.log('email', email);
    const domainInfo = await this.appService.getDomainInfo(email.split('@')[1]);
    if (!domainInfo || domainInfo.domainUsers.length === 0) {
      console.log('No domain found');
      return null;
    }
    const randomIndex = Math.floor(
      Math.random() * domainInfo.domainUsers.length,
    );
    return await this.appService.createNewAlias({
      username: domainInfo?.domainUsers[randomIndex]?.apiUserName,
      email: email,
      apiUrl: domainInfo.apiUrl,
      apiKey: domainInfo.apiKey,
    });
  }

  @MessagePattern('mailcow.deleteAlias')
  async deleteAlias(@Payload() data: ExpiredAliasesGroupType) {
    const domainInfo = await this.appService.getDomainInfo(data.domain);
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
