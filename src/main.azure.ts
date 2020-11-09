import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AzureHttpRouter} from "@nestjs/azure-func-http";

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, new AzureHttpRouter());

  await app.init();
  return app;
}
