import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cors } from 'cors';
import { helmet } from 'helmet';

import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cors());
  // app.use(helmet());
  //app.useGlobalPipes(new ValidationPipe()); // global scope validation
  app.use((req: Request, res: Response, next: Function) => {
    console.log('%s', req);
    next();
  });
  await app.listen(3000);
}
bootstrap();
