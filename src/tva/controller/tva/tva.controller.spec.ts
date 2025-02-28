import { Test, TestingModule } from '@nestjs/testing';
import { TvaController } from './tva.controller';

describe('TvaController', () => {
  let controller: TvaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TvaController],
    }).compile();

    controller = module.get<TvaController>(TvaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
