import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity])],
  providers: [PhotoService],
  controllers: [PhotoController],
  exports: [TypeOrmModule], // for external module usage
})
export class PhotoModule {}
