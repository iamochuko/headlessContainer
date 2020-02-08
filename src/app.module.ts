import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { CatController } from './cat/cat.controller';
import { CustomerModule } from './customer/customer.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './exception/http-exception-filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { TimeoutInterceptor } from './interceptor/timeout.interceptor';
import { AuthModule } from './auth/auth.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoHttpModule } from './photo-http/photo-http.module';
import { AuthorModule } from './author/author.module';
import { TypeOrmConfigService } from './lib/typeormconfig/typeormconfig.service';
import { MongooseConfigService } from './lib/mongooseConfig/mongooseconfig.service';

@Module({
  imports: [
    CatModule,
    CustomerModule,
    AuthModule,
    ConfigModule.forRoot({
      /* envFilePath: '.development.env', */ 
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid(
          'development',
          'production',
          'test',
          'provision',
        ).default('development'),
        PORT: Joi.number().default(5000)
      }),
      validationOptions:{
        //allowUnknown: false,
        abortEarly: true,
      },
      expandVariables:true
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    PhotoModule,
    PhotoHttpModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TypeOrmConfigService,
    MongooseConfigService,
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
  constructor(private readonly connection: Connection) {}

  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cat', method: RequestMethod.GET }) // for a path and httpMethod type
      .forRoutes(CatController);
  }
}
