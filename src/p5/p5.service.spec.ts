import { Test, TestingModule } from '@nestjs/testing';
import { P5Service } from './p5.service';

describe('P5Service', () => {
  let service: P5Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [P5Service],
    }).compile();

    service = module.get<P5Service>(P5Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
