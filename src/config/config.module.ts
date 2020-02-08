import { Module, DynamicModule } from '@nestjs/common';

import { ConfigService } from './config.service';
import { CONFIG } from '../lib/constants';


/* NB: Calling ConfigModule.register(...) returns a DynamicModule (created at run-time) object with properties which are essentially the same as those that, until now, we've provided as metadata via the @Module() decorator. */
@Module({})
export class ConfigModule {
  static register(options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          // custom provider
          provide: CONFIG.CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
