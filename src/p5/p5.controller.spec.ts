import { Test, TestingModule } from '@nestjs/testing';
import { P5Controller } from './p5.controller';

describe('P5Controller', () => {
  let controller: P5Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [P5Controller],
    }).compile();

    controller = module.get<P5Controller>(P5Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
