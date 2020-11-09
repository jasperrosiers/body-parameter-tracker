import {Injectable, NotFoundException} from '@nestjs/common';
import {ParametersRepository} from "./parameters.repository";
import {ParametersEntity} from "./parameters.entity";
import {ParametersDto} from "./parameters.dto";

@Injectable()
export class ParametersService {
    constructor(private readonly parametersRepository: ParametersRepository) {
    }

    async create(parametersDto: ParametersDto): Promise<ParametersEntity> {
        let bodyweight;
        let fatPercentage;
        let musclePercentage;

        if (parametersDto.bodyWeight) {
            bodyweight = {
                weight: Array.from([parametersDto.bodyWeight]),
                update: [new Date()]
            }
        }
        if (parametersDto.fatPercentage) {
            fatPercentage = {
                percentage: Array.from([parametersDto.fatPercentage]),
                update: [new Date()]
            }
        }
        if (parametersDto.musclePercentage) {
            musclePercentage = {
                percentage: Array.from([parametersDto.musclePercentage]),
                update: [new Date()]
            }
        }

        return this.parametersRepository.create(new ParametersEntity(parametersDto.userName, bodyweight, fatPercentage, musclePercentage));
    }

    async update(parametersEntity: ParametersEntity): Promise<ParametersEntity> {
        return this.parametersRepository.upsert(parametersEntity);
    }

    async delete(parametersEntityUserName: string) {
        const parametersEntity = await this.parametersRepository.findByUserName(parametersEntityUserName);
        if (parametersEntity) {
            return this.parametersRepository.remove(parametersEntityUserName, parametersEntity.userName);
        }

        throw new NotFoundException('Item with userName: ' + parametersEntityUserName + ' not found');
    }

    async getAll(): Promise<ParametersEntity[]> {
        return this.parametersRepository.findAll();
    }

    async getParametersEntityByUserName(parametersEntityUserName: string): Promise<ParametersEntity> {
        return this.parametersRepository.findByUserName(parametersEntityUserName);
    }

    mapDtoToEntity(parametersDto: ParametersDto, parametersEntity: ParametersEntity): ParametersEntity {
        const today: Date = new Date();
        if(parametersDto.bodyWeight) {
            parametersEntity.bodyWeight.update.push(today);
            parametersEntity.bodyWeight.weight.push(parametersDto.bodyWeight);
        }
        if(parametersDto.fatPercentage) {
            parametersEntity.fatPercentage.update.push(today);
            parametersEntity.fatPercentage.percentage.push(parametersDto.fatPercentage);
        }
        if(parametersDto.musclePercentage) {
            parametersEntity.musclePercentage.update.push(today);
            parametersEntity.musclePercentage.percentage.push(parametersDto.musclePercentage);
        }

        return parametersEntity;
    }
}
