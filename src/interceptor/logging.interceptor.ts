import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Intercept Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`interceptor After: ${Date.now() - now}ms`)));
  }
}
