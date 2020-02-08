import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

@Injectable() // @Injectable() decorator marks the Service class as a provider that can be managed by the Nest Inversion Of Control (IoC) container..
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb://localhost/may-project2019'
        /* process.env.NODE_ENV === 'development'
          ? `${process.env.MONGO_DB_URI_DEV}`
          : `${process.env.MONGO_DB_URI_PROD}` */,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
  }
}
