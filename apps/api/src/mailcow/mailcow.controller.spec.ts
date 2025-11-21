import { Test, TestingModule } from '@nestjs/testing';
import { MailcowController } from './mailcow.controller';

describe('MailcowController', () => {
  let controller: MailcowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailcowController],
    }).compile();

    controller = module.get<MailcowController>(MailcowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
