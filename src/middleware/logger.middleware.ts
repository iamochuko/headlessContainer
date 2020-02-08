import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('[LoggerMiddleware] - url:', req.url);
    console.log('[LoggerMiddleware] - params:', req.params);

    next();
  }
}
