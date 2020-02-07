import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

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
import { PhotoModule } from './photo/photo.module';
import { PhotoHttpModule } from './photo-http/photo-http.module';
import { AuthorModule } from './author/author.module';
import { TypeOrmConfigService } from './lib/typeormconfig/typeormconfig.service';

// ConfigModule.register({folder: './config'})  - a dynamic module whose comsumer can supply config setting
@Module({
  imports: [
    CatModule,
    CustomerModule,
    AuthModule,
    ConfigModule.register({ folder: './env' }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    PhotoModule,
    PhotoHttpModule,
    AuthorModule,
  ],
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
    TypeOrmConfigService,
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}

  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cat', method: RequestMethod.GET }) // for a path and httpMethod type
      .forRoutes(CatController);
  }
}
