import { AppService } from '@application/services/app.service';
import { HealthService } from '@application/services/health.service';
import { AppController } from '@interfaces/http/controllers/app/app.controller';
import { HealthController } from '@interfaces/http/controllers/health/health.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number.parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'traffic_user',
      password: process.env.DB_PASSWORD || 'traffic_password',
      database: process.env.DB_NAME || 'traffic_db',
      autoLoadModels: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, HealthService],
})
export class AppModule {}
