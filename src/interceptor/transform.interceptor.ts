import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface IResponse<T> {
  data: T;
}

/* 
Interceptor:

1. bind extra logic before / after method execution
2. transform the result returned from a function
3. transform the exception thrown from a function
4. extend the basic function behavior
5. completely override a function depending on specific conditions (e.g., for caching purposes)
 */

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>> {
  intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map(data => {
        console.log('data: interceptor:', data);
        return { data };
      }),
    );
  }
}
