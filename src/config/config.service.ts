import { Injectable, Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import path = require('path');

import { IEnvConfig } from '../interface';
import { CONFIG } from '../lib/constants';

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvConfig;

  // Recall: when we define a provider in @Module using a
  // non-class token we need to use the @Inject() for DI
  constructor(@Inject(CONFIG.CONFIG_OPTIONS) private readonly options) {
    console.log('[ConfigService] - options: ', options);
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    this.envConfig = dotenv.parse(
      fs.readFileSync(
        path.resolve(__dirname, '../../', options.folder, filePath),
      ),
    );
  }

  get(key: string): string {
    console.log('[ConfigService from Pre-Hook] - key:', key)
    return this.envConfig[key];
  }
}
