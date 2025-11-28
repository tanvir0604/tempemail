import { Test, TestingModule } from '@nestjs/testing';
import { ImapFlowService } from './imap-flow.service';

describe('ImapFlowService', () => {
  let service: ImapFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImapFlowService],
    }).compile();

    service = module.get<ImapFlowService>(ImapFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
