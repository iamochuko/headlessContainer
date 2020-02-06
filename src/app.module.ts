import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { CustomerModule } from './customer/customer.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CatController } from './cat/cat.controller';
import { HttpExceptionFilter } from './Exception/http-exception-filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { TimeoutInterceptor } from './interceptor/timeout.interceptor';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

// ConfigModule.register({folder: './config'})  - a dynamic module whose comsumer can supply config setting

@Module({
  imports: [CatModule, CustomerModule, AuthModule, ConfigModule.register({folder: './env'})],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // apply filter at global scope
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cat', method: RequestMethod.GET }) // for a path and httpMethod type
      .forRoutes(CatController);
  }
}
