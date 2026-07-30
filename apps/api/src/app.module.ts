import { Module } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";

import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { GlobalExceptionFilter } from "./common/filters/global-exception.filter.js";
import { createGlobalValidationPipe } from "./common/pipes/validation.pipe.js";
import { ConfigurationModule } from "./config/configuration.module.js";
import { HealthModule } from "./health/health.module.js";
import { LoggerModule } from "./logger/logger.module.js";

@Module({
  imports: [ConfigurationModule, LoggerModule, HealthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
    {
      provide: APP_PIPE,
      useFactory: createGlobalValidationPipe
    }
  ]
})
export class AppModule {}
