import { Test, TestingModule } from '@nestjs/testing';
import { ParametersController } from './parameters.controller';
import {ConfigService} from "@nestjs/config";
import {ParametersService} from "./parameters.service";
import {LoggerService} from "../logger/logger.service";

describe('ParametersController', () => {
  let controller: ParametersController;
  const configService: Partial<ConfigService> = {
    get(propertyPath: string): string {
      return '{}'
    }
  };
  const parametersService = {};
  const loggerService = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
      setContext(context: string): void {}
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParametersController],
      providers: [
        {
          provide: ConfigService,
          useValue: configService
        },
        {
          provide: ParametersService,
          useValue: parametersService
        },
        {
          provide: LoggerService,
          useValue: loggerService
        }
      ]
    }).compile();

    controller = module.get<ParametersController>(ParametersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
