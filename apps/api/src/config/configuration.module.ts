import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { appConfig } from "./app.config.js";
import { validateEnvironment } from "./env.validation.js";

const nodeEnv = process.env.NODE_ENV ?? "development";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${nodeEnv}.local`, `.env.${nodeEnv}`, ".env.local", ".env"],
      expandVariables: true,
      isGlobal: true,
      load: [appConfig],
      validate: validateEnvironment
    })
  ]
})
export class ConfigurationModule {}
