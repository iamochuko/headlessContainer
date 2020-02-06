import { Injectable, Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import path = require('path');

import { IEnvConfig } from '../interface';
import { Config } from '../lib/constants';

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvConfig;

  // Recall: when we define a provider in @Module using a
  // non-class token we need to use the @Inject() for DI

  constructor(@Inject(Config.CONFIG_OPTIONS) private options) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    this.envConfig = dotenv.parse(
      fs.readFileSync(
        path.resolve(__dirname, '../../', options.folder, filePath),
      ),
    );
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
