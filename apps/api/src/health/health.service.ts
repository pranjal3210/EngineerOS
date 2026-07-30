import { Injectable } from "@nestjs/common";

export interface HealthStatus {
  status: "ok";
}

export interface ReadinessStatus {
  status: "ready";
}

@Injectable()
export class HealthService {
  getHealth(): HealthStatus {
    return {
      status: "ok"
    };
  }

  getReadiness(): ReadinessStatus {
    return {
      status: "ready"
    };
  }
}
