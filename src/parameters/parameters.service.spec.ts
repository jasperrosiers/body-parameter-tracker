import { Test, TestingModule } from '@nestjs/testing';
import { ParametersService } from './parameters.service';
import {ParametersRepository} from "./parameters.repository";

describe('ParametersService', () => {
  let service: ParametersService;
  const parametersRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          ParametersService,
          {
            provide: ParametersRepository,
            useValue: parametersRepository
          },
      ],
    }).compile();

    service = module.get<ParametersService>(ParametersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
