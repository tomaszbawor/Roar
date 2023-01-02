import { Test, TestingModule } from '@nestjs/testing';
import { RegenCronService } from './regen-cron.service';

describe('RegenCronService', () => {
  let service: RegenCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegenCronService],
    }).compile();

    service = module.get<RegenCronService>(RegenCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
