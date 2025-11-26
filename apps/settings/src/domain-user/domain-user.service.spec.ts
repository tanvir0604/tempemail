import { Test, TestingModule } from '@nestjs/testing';
import { DomainUserService } from './domain-user.service';

describe('DomainUserService', () => {
  let service: DomainUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainUserService],
    }).compile();

    service = module.get<DomainUserService>(DomainUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
