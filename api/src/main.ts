import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const API_PREFIX = 'api/v1';

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);
  nestApp.setGlobalPrefix(API_PREFIX);
  await nestApp.listen(3000);
}
bootstrap();
