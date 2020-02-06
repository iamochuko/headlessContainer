import { Module, DynamicModule } from '@nestjs/common';

import { ConfigService } from './config.service';
import { Config } from '../lib/constants';

@Module({})
/* It should now be clear how the pieces tie together. Calling ConfigModule.register(...) returns a DynamicModule object with properties which are essentially the same as those that, until now, we've provided as metadata via the @Module() decorator. */
export class ConfigModule {
  static register(options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: Config.CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
