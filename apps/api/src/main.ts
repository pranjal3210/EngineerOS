import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";

import { AppModule } from "./app.module.js";
import { configureHttp } from "./bootstrap/http.js";
import type { AppConfiguration } from "./config/app.config.js";

type ApiConfig = {
  app: AppConfiguration;
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  const configService = app.get<ConfigService<ApiConfig, true>>(ConfigService);
  const config = configService.get("app", { infer: true });

  app.useLogger(app.get(Logger));
  configureHttp(app);

  await app.listen(config.port);
}

void bootstrap();
