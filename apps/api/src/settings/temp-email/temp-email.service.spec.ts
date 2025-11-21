import { Test, TestingModule } from '@nestjs/testing';
import { TempEmailService } from './temp-email.service';

describe('TempEmailService', () => {
  let service: TempEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TempEmailService],
    }).compile();

    service = module.get<TempEmailService>(TempEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
