import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('mailcow.createNewAlias')
  async createNewAlias(@Payload() email: string) {
    const domainInfo = await this.appService.getDomainInfo(email.split('@')[1]);
    if (!domainInfo) {
      return;
    }
    return this.appService.createNewAlias({
      domain: domainInfo.domain,
      username: domainInfo.username,
      email: email,
      apiUrl: domainInfo.apiUrl,
      apiKey: domainInfo.apiKey,
    });
  }

  @EventPattern('mailcow.sync')
  sync() {
    return this.appService.initializeImap(true);
  }
}
