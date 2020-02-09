import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as session from 'express-session';
import * as rateLimit from 'express-rate-limit'

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
//import { ValidationPipe } from './pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  //require('dotenv').config({ debug: process.env.DOTENV_DEBUG });

  const sess = {
    //TODO: Config other options
    secret: 'find!0039Z~',
    cookie: {secure: null} ,
  };
  if (process.env.NODE_ENV === 'production') {
    sess.cookie.secure = true;
  }

  app.use(helmet());
  app.enableCors();
  app.use(session(sess));
  app.use(csurf()); //TODO: add options
  app.use(compression());
  app.use(rateLimit({
    windowMs: 15*60*1000, //15 minutes
    max: 100 // IP per windowMs
  }))
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages:
        process.env.NODE_ENV === 'production' ? true : false,
    }),
  );

  await app.listen(5000 || configService.get('PORT'));
}

bootstrap();
