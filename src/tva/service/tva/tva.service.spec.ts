import { Test, TestingModule } from '@nestjs/testing';
import { TvaService } from './tva.service';

describe('TvaService', () => {
  let service: TvaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvaService],
    }).compile();

    service = module.get<TvaService>(TvaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
