import { registerAs } from "@nestjs/config";

export type NodeEnvironment = "development" | "production" | "test";

export interface AppConfiguration {
  env: NodeEnvironment;
  isProduction: boolean;
  port: number;
  cors: {
    origins: string[];
    credentials: boolean;
  };
  logger: {
    level: string;
    pretty: boolean;
  };
}

const parseOrigins = (value?: string): string[] =>
  value
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

const parseBoolean = (value: string | undefined, defaultValue: boolean) => {
  if (value === undefined) {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
};

export const appConfig = registerAs("app", (): AppConfiguration => {
  const env = (process.env.NODE_ENV ?? "development") as NodeEnvironment;
  const isProduction = env === "production";

  return {
    env,
    isProduction,
    port: Number(process.env.PORT ?? 3001),
    cors: {
      origins: parseOrigins(process.env.CORS_ORIGIN),
      credentials: parseBoolean(process.env.CORS_CREDENTIALS, true)
    },
    logger: {
      level: process.env.LOG_LEVEL ?? (isProduction ? "info" : "debug"),
      pretty: !isProduction
    }
  };
});
