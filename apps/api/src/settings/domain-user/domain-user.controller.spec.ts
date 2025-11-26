import { Test, TestingModule } from '@nestjs/testing';
import { DomainUserController } from './domain-user.controller';

describe('DomainUserController', () => {
  let controller: DomainUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainUserController],
    }).compile();

    controller = module.get<DomainUserController>(DomainUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
