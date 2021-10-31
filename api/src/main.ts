import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_PREFIX } from './config';

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);
  nestApp.setGlobalPrefix(API_PREFIX);
  await nestApp.listen(process.env.HOST_PORT || 3000);
}
bootstrap();
