import { Test, TestingModule } from '@nestjs/testing';
import { MailcowService } from './mailcow.service';

describe('MailcowService', () => {
  let service: MailcowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailcowService],
    }).compile();

    service = module.get<MailcowService>(MailcowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
