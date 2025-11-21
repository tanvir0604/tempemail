import { Test, TestingModule } from '@nestjs/testing';
import { TempEmailController } from './temp-email.controller';

describe('TempEmailController', () => {
  let controller: TempEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TempEmailController],
    }).compile();

    controller = module.get<TempEmailController>(TempEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
