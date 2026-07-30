import { Controller, Get } from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AppService } from "./app.service.js";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth() {
    return this.appService.getHealth();
  }
}
