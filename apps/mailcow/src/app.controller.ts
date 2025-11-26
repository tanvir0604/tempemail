import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('mailcow.createNewAlias')
  async createNewAlias(@Payload() email: string) {
    const domainInfo = await this.appService.getDomainInfo(email.split('@')[1]);
    if (!domainInfo || domainInfo.domainUsers.length === 0) {
      return;
    }
    const randomIndex = Math.floor(
      Math.random() * domainInfo.domainUsers.length,
    );
    // console.log('randomIndex', randomIndex, domainInfo);
    return await this.appService.createNewAlias({
      username: domainInfo?.domainUsers[randomIndex]?.apiUserName,
      email: email,
      apiUrl: domainInfo.apiUrl,
      apiKey: domainInfo.apiKey,
    });
  }
}
