import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from "./logger/logger.service";
import { ConfigService } from "@nestjs/config";
import {RolesGuard} from "./auth/roles.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = await app.resolve(LoggerService);
  app.useLogger(loggerService);
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 8080);
  await app.listen(port);
}
bootstrap();
