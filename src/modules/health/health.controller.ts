import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('health')
  getHealth(): { status: string; timestamp: string } {
    return this.healthService.getHealthStatus();
  }
}
