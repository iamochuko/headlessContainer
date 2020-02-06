import { Module } from '@nestjs/common';

import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  imports: [],
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService], // for sharedModule purposes
})
export class CatModule {}
