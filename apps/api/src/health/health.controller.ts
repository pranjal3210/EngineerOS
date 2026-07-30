import { Controller, Get } from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HealthService } from "./health.service.js";

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get("health")
  getHealth() {
    return this.healthService.getHealth();
  }

  @Get("ready")
  getReadiness() {
    return this.healthService.getReadiness();
  }
}
