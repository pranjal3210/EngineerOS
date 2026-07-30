import type { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";

import type { AppConfiguration } from "../config/app.config.js";

type ApiConfig = {
  app: AppConfiguration;
};

export const configureHttp = (app: INestApplication): void => {
  const configService = app.get<ConfigService<ApiConfig, true>>(ConfigService);
  const config = configService.get("app", { infer: true });
  const corsOrigin = config.cors.origins.length > 0 ? config.cors.origins : !config.isProduction;

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false
    })
  );

  app.enableCors({
    allowedHeaders: ["Accept", "Authorization", "Content-Type"],
    credentials: config.cors.credentials,
    maxAge: 86400,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    origin: corsOrigin
  });
};
