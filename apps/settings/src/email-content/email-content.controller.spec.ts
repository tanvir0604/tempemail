import { Test, TestingModule } from '@nestjs/testing';
import { EmailContentController } from './email-content.controller';

describe('EmailContentController', () => {
  let controller: EmailContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailContentController],
    }).compile();

    controller = module.get<EmailContentController>(EmailContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
