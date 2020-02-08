import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
//import { ValidationPipe } from './pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  //require('dotenv').config({ debug: process.env.DOTENV_DEBUG });

  app.use(cors());
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
      disableErrorMessages:
        process.env.NODE_ENV === 'production' ? true : false,
    }),
  );

  await app.listen(5000 || configService.get('PORT'));
}

bootstrap();
