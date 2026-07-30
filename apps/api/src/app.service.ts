import { Injectable } from "@nestjs/common";
import type { EngineerOSHealth } from "@engineeros/types";

@Injectable()
export class AppService {
  getHealth(): EngineerOSHealth {
    return {
      service: "api",
      status: "ok",
      timestamp: new Date().toISOString()
    };
  }
}
