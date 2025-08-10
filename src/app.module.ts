import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { HealthController } from './modules/health/health.controller';
import { HealthService } from './modules/health/health.service';

@Module({
  imports: [],
  controllers: [AppController, HealthController],
  providers: [AppService, HealthService],
})
export class AppModule {}
