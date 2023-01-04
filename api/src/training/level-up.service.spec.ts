import { Test, TestingModule } from '@nestjs/testing';
import { LevelUpService } from './level-up.service';

describe('LevelUpService', () => {
  let service: LevelUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelUpService],
    }).compile();

    service = module.get<LevelUpService>(LevelUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
