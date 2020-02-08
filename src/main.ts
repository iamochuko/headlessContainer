import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { Request, Response } from 'express';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  //require('dotenv').config({ debug: process.env.DOTENV_DEBUG });

  app.use(cors());
  app.use(helmet());
  //app.useGlobalPipes(new ValidationPipe()); // global scope validation
  app.use((req: Request, res: Response, next: Function) => {
    //console.log('%s', req);
    next();
  });
  await app.listen(5000 || configService.get('PORT'));
}
bootstrap();
