import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { Observable } from 'rxjs';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('health')
  getHealth(): Observable<{ status: string; timestamp: string }> {
    return this.healthService.getHealthStatus();
  }
}
