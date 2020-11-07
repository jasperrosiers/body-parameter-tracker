import {Container} from '@azure/cosmos';
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@dinohorvat/azure-database/dist";
import {ParametersEntity} from "./parameters.entity";
import {LoggerService} from "../logger/logger.service";

@Injectable()
export class ParametersRepository {

    constructor(@InjectModel(ParametersEntity) private readonly container: Container, private loggerService: LoggerService) {
        this.loggerService.setContext('ParametersRepository');
    }

    async create(item: ParametersEntity): Promise<ParametersEntity> {
        item.createdAt = new Date();
        const response = await this.container.items.create(item);
        this.loggerService.verbose(`Create RUs: ${response.requestCharge}`);
        return response.resource;
    }

    async upsert(item: ParametersEntity): Promise<ParametersEntity> {
        item.updatedAt = new Date();
        const response = await this.container.items.upsert<ParametersEntity>(item);
        this.loggerService.verbose(`Upsert RUs: ${response.requestCharge}`);
        return response.resource;
    }

    async remove(id: string, partitionKeyValue: any) {
        const item = this.container.item(id, partitionKeyValue);
        const result = await item.delete();
        this.loggerService.verbose(`Remove item RUs: ${result.requestCharge}`);
    }

    async findAll(): Promise<ParametersEntity[]> {
        const querySpec = {
            query: 'SELECT * FROM root r',
        };

        const results = await this.container.items
            .query<ParametersEntity>(querySpec, {})
            .fetchAll();
        this.loggerService.verbose(`Find By Id RUs: ${results.requestCharge}`);
        return results.resources;
    }

    async findByUserName(userName: string): Promise<ParametersEntity> {
        const querySpec = {
            query: 'SELECT * FROM root r WHERE r.userName=@userName',
            parameters: [
                {
                    name: '@userName',
                    value: userName,
                },
            ],
        };

        const results = await this.container.items
            .query<ParametersEntity>(querySpec, {})
            .fetchAll();
        this.loggerService.verbose(`Find By Id RUs: ${results.requestCharge}`);
        return results.resources.shift();
    }

    async count(): Promise<number> {
        const querySpec = {
            query: 'SELECT VALUE COUNT(1) FROM root r',
        };

        const results = await this.container.items.query(querySpec).fetchAll();
        this.loggerService.verbose(`Count RUs: ${results.requestCharge}`);
        return results.resources.shift();
    }
}
