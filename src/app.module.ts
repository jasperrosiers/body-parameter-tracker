import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParametersModule } from './parameters/parameters.module';
import { LoggerModule } from './logger/logger.module';
import {ConfigModule} from "@nestjs/config";
import {AzureCosmosDbModule} from "@dinohorvat/azure-database/dist";

@Module({
  imports: [
      ConfigModule.forRoot(),
      ParametersModule,
      LoggerModule,
      AzureCosmosDbModule.forRoot({
          dbName: process.env.DATABASE_NAME,
          endpoint: process.env.DATABASE_ENDPOINT,
          key: process.env.DATABASE_KEY,
      })
  ],
  controllers: [
      AppController
  ],
  providers: [
      AppService,
  ],
})
export class AppModule {}
