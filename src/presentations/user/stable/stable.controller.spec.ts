import { Test, TestingModule } from '@nestjs/testing';
import { StableController } from './stable.controller';

describe('StableController', () => {
  let controller: StableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StableController],
    }).compile();

    controller = module.get<StableController>(StableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
