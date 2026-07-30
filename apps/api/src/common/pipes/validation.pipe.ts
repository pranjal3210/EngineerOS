import { ValidationPipe } from "@nestjs/common";

export const createGlobalValidationPipe = () =>
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: false
    },
    validationError: {
      target: false,
      value: false
    },
    whitelist: true
  });
