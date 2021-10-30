import { Test, TestingModule } from '@nestjs/testing';
import { GoogleController } from './google.controller';
import { GoogleModule } from './google.module';

describe('GoogleController', () => {
  let controller: GoogleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GoogleModule],
    }).compile();

    controller = module.get<GoogleController>(GoogleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
