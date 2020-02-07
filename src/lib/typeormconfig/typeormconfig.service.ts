import { Injectable } from '@nestjs/common';
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm'

import { PhotoEntity } from '../../photo/photo.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions():TypeOrmModuleOptions{
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'toor',
          database: 'headless_101_cms',
          entities: [PhotoEntity],
          synchronize: true,
        };
    }
}
