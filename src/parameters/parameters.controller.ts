import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import {ParametersService} from "./parameters.service";
import {LoggerService} from "../logger/logger.service";
import {ParametersDto} from "./parameters.dto";
import {ParametersEntity} from "./parameters.entity";
import {AuthGuard} from "../auth/auth.guard";
import {Roles} from "../auth/roles.decorator";

@Controller('parameters')
export class ParametersController {
    constructor(private readonly parametersService: ParametersService, private readonly loggerSerivce: LoggerService) {
        this.loggerSerivce.setContext('ParametersController');
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createParameters(@Body() parametersDto: ParametersDto): Promise<void> {
        const existingParams: ParametersEntity = await this.parametersService.getParametersEntityByUserName(parametersDto.userName);

        if (existingParams) {
            const updatedParams: ParametersEntity = this.parametersService.mapDtoToEntity(parametersDto, existingParams);
            this.parametersService.update(updatedParams);
        } else {
            this.parametersService.create(parametersDto)
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findOne(@Param('userName') userName: string): Promise<ParametersEntity> {
        return this.parametersService.getParametersEntityByUserName(userName);
    }

    @Get()
    @Roles('admin')
    async findAll(): Promise<ParametersEntity[]> {
        return this.parametersService.getAll();
    }
}
