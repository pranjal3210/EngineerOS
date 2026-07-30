import { Catch, HttpException, HttpStatus } from "@nestjs/common";
import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import type { Request, Response } from "express";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

interface ErrorResponseBody {
  success: false;
  statusCode: number;
  message: string | string[];
  timestamp: string;
  path: string;
}

const getHttpExceptionMessage = (exception: HttpException): string | string[] => {
  const response = exception.getResponse();

  if (typeof response === "string") {
    return response;
  }

  if (typeof response === "object" && response !== null && "message" in response) {
    const message = (response as { message?: unknown }).message;

    if (typeof message === "string" || Array.isArray(message)) {
      return message as string | string[];
    }
  }

  return exception.message;
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @InjectPinoLogger(GlobalExceptionFilter.name)
    private readonly logger: PinoLogger
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = isHttpException ? getHttpExceptionMessage(exception) : "Internal server error";

    if (!isHttpException) {
      this.logger.error(
        {
          err: exception,
          path: request.url,
          method: request.method
        },
        "Unhandled exception"
      );
    }

    const body: ErrorResponseBody = {
      success: false,
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url
    };

    response.status(statusCode).json(body);
  }
}
