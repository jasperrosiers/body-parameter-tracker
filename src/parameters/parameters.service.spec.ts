import { Test, TestingModule } from '@nestjs/testing';
import { ParametersService } from './parameters.service';
import {ParametersRepository} from "./parameters.repository";
import {ParametersDto} from "./parameters.dto";
import {ParametersEntity} from "./parameters.entity";

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

  // Test
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test
  it('should return a properly mapped ParametersEntity from a completely filled ParametersDto', () => {
    const parametersDto: ParametersDto = {
      userName: 'testName',
      bodyWeight: 78,
      fatPercentage: 23,
      musclePercentage: 70
    };

    let parametersEntity: ParametersEntity = {
      bodyWeight: {
        update: [new Date("2019-01-16")],
        weight: [80]},
      createdAt: new Date("2019-01-16"),
      fatPercentage: {
        percentage: [25],
        update: [new Date("2019-01-16")]},
      musclePercentage: {
        percentage: [64],
        update: [new Date("2019-01-16")]},
      userName: "testName"
    };

    const parametersEntityExpectedResult: ParametersEntity = {
      bodyWeight: {
        update: [new Date("2019-01-16"), new Date()],
        weight: [80, 78]},
      createdAt: new Date("2019-01-16"),
      fatPercentage: {
        percentage: [25, 23],
        update: [new Date("2019-01-16"), new Date()]},
      musclePercentage: {
        percentage: [64, 70],
        update: [new Date("2019-01-16"), new Date()]},
      userName: "testName"
    };

    parametersEntity = service.mapDtoToEntity(parametersDto, parametersEntity);

    // Checking the entire objects with each other won't work because `new Date()` has millisecond precision, which are not equal
    expect(parametersEntity.bodyWeight.weight).toEqual(parametersEntityExpectedResult.bodyWeight.weight);
    expect(parametersEntity.fatPercentage.percentage).toEqual(parametersEntityExpectedResult.fatPercentage.percentage);
    expect(parametersEntity.musclePercentage.percentage).toEqual(parametersEntityExpectedResult.musclePercentage.percentage);
    expect(parametersEntity.bodyWeight.update[1].getDate()).toEqual(parametersEntityExpectedResult.bodyWeight.update[1].getDate())
    expect(parametersEntity.fatPercentage.update[1].getDate()).toEqual(parametersEntityExpectedResult.fatPercentage.update[1].getDate())
    expect(parametersEntity.musclePercentage.update[1].getDate()).toEqual(parametersEntityExpectedResult.musclePercentage.update[1].getDate())
  });

  // Test
  it('should return a properly mapped ParametersEntity from a partially filled ParametersDto', () => {
    const parametersDto: ParametersDto = {
      userName: 'testName',
      bodyWeight: 78,
      fatPercentage: undefined,
      musclePercentage: undefined
    };

    let parametersEntity: ParametersEntity = {
      bodyWeight: {
        update: [new Date("2019-01-16")],
        weight: [80]},
      createdAt: new Date("2019-01-16"),
      fatPercentage: {
        percentage: [25],
        update: [new Date("2019-01-16")]},
      musclePercentage: {
        percentage: [64],
        update: [new Date("2019-01-16")]},
      userName: "testName"
    };

    const parametersEntityExpectedResult: ParametersEntity = {
      bodyWeight: {
        update: [new Date("2019-01-16"), new Date()],
        weight: [80, 78]},
      createdAt: new Date("2019-01-16"),
      fatPercentage: {
        percentage: [25],
        update: [new Date("2019-01-16")]},
      musclePercentage: {
        percentage: [64],
        update: [new Date("2019-01-16")]},
      userName: "testName"
    };

    parametersEntity = service.mapDtoToEntity(parametersDto, parametersEntity);

    // Checking the entire objects with each other won't work because `new Date()` has millisecond precision, which are not equal
    expect(parametersEntity.bodyWeight.weight).toEqual(parametersEntityExpectedResult.bodyWeight.weight);
    expect(parametersEntity.fatPercentage.percentage).toEqual(parametersEntityExpectedResult.fatPercentage.percentage);
    expect(parametersEntity.musclePercentage.percentage).toEqual(parametersEntityExpectedResult.musclePercentage.percentage);
    expect(parametersEntity.bodyWeight.update[1].getDate()).toEqual(parametersEntityExpectedResult.bodyWeight.update[1].getDate())
    expect(parametersEntity.fatPercentage.update[1]).toBeUndefined;
    expect(parametersEntity.musclePercentage.update[1]).toBeUndefined;
  });
});
