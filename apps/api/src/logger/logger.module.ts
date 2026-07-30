import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";

import type { AppConfiguration } from "../config/app.config.js";

type ApiConfig = {
  app: AppConfiguration;
};

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ApiConfig, true>) => {
        const app = configService.get("app", { infer: true });

        return {
          pinoHttp: {
            autoLogging: {
              ignore: (request: { url?: string }) =>
                request.url === "/health" || request.url === "/ready"
            },
            level: app.logger.level,
            redact: ["req.headers.authorization", "req.headers.cookie", "res.headers.set-cookie"],
            transport: app.logger.pretty
              ? {
                  target: "pino-pretty",
                  options: {
                    colorize: true,
                    ignore: "pid,hostname",
                    singleLine: true,
                    translateTime: "SYS:standard"
                  }
                }
              : undefined
          }
        };
      }
    })
  ],
  exports: [PinoLoggerModule]
})
export class LoggerModule {}
