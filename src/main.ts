import { NestFactory } from '@nestjs/core';
import { APP_CONSTANTS } from '@shared/constants/app.constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  await app.listen(process.env.PORT ?? APP_CONSTANTS.DEFAULT_PORT);
}
void bootstrap();
