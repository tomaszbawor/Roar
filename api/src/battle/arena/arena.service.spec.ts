import { Test, TestingModule } from '@nestjs/testing';
import { ArenaService } from './arena.service';

describe('ArenaService', () => {
  let service: ArenaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArenaService],
    }).compile();

    service = module.get<ArenaService>(ArenaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
