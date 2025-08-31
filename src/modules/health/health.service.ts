import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class HealthService {
  getHealthStatus(): Observable<{ status: string; timestamp: string }> {
    return of({
      status: 'OK',
      timestamp: new Date().toISOString(),
    });
  }
}
