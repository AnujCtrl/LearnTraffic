import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { HealthController } from './modules/health/health.controller';
import { HealthService } from './modules/health/health.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
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
