import { Module } from '@nestjs/common';
import { ParametersController } from './parameters.controller';
import { ParametersService } from './parameters.service';
import {LoggerModule} from "../logger/logger.module";
import {AzureCosmosDbModule} from "@dinohorvat/azure-database/dist";
import {ParametersEntity} from "./parameters.entity";
import {ParametersRepository} from "./parameters.repository";
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "../auth/roles.guard";

@Module({
  controllers: [ParametersController],
  providers: [
      ParametersService, ParametersRepository,
      {
        provide: APP_GUARD,
        useClass: RolesGuard,
      },
  ],
  imports: [
      LoggerModule,
      ConfigModule,
      AzureCosmosDbModule.forFeature([{dto: ParametersEntity}])
  ]
})
export class ParametersModule {}
