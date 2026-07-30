import type { NodeEnvironment } from "./app.config.js";

const NODE_ENV_VALUES = ["development", "production", "test"] as const;
const BOOLEAN_VALUES = ["true", "false"] as const;

type RawEnvironment = Record<string, string | undefined>;

const assertStringValue = (
  key: string,
  value: string | undefined,
  allowedValues: readonly string[]
) => {
  if (value !== undefined && !allowedValues.includes(value)) {
    throw new Error(`${key} must be one of: ${allowedValues.join(", ")}`);
  }
};

const assertPort = (value: string | undefined) => {
  if (value === undefined) {
    return;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }
};

export const validateEnvironment = (config: Record<string, unknown>): RawEnvironment => {
  const environment = config as RawEnvironment;
  const nodeEnv = environment.NODE_ENV ?? "development";

  assertStringValue("NODE_ENV", nodeEnv, NODE_ENV_VALUES);
  assertPort(environment.PORT);
  assertStringValue("CORS_CREDENTIALS", environment.CORS_CREDENTIALS, BOOLEAN_VALUES);

  if ((nodeEnv as NodeEnvironment) === "production" && !environment.CORS_ORIGIN) {
    throw new Error("CORS_ORIGIN is required when NODE_ENV=production");
  }

  return {
    ...environment,
    NODE_ENV: nodeEnv
  };
};
