import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatSchema } from './schema/cat.schema';
import { ConfigService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Cat',
        imports: [ConfigModule],
        //NB: useFactory creates Providers dynamically
        useFactory: (configService: ConfigService) => {
          //TODO: you can set hooks or plugin for schema 
          const schema = CatSchema;
          // schema.plugin(require('mongoose-autocomplete'))
          schema.pre('save', () => {
            //configService.get('APP_NAME');
          });
          return schema;
        },
        //inject: [ConfigService],
      },
    ]),
  ],
  controllers: [CatController],
  providers: [CatService,],
  exports: [CatService, MongooseModule] /** for sharedModule purposes */,
})
export class CatModule {}
