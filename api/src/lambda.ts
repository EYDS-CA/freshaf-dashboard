import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  Callback,
  Handler,
} from 'aws-lambda';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();

    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp));

    await nestApp.init();
    
    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
): Promise<APIGatewayProxyResult> => {
  cachedServer = await bootstrap();
  return cachedServer(event, context, callback);
};
