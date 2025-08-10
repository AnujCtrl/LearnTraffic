import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealthStatus(): { status: string; timestamp: string } {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}
