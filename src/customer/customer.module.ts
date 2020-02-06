import { Module } from '@nestjs/common';
import { CatModule } from 'src/cat/cat.module';

@Module({
  imports: [CatModule],
})
export class CustomerModule {}
