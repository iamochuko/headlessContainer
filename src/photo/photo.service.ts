import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PhotoEntity } from './photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
   // private readonly mockRepository: Repository<PhotoEntity>,
  ) {}


  findAll(): Promise<PhotoEntity[]> {
    return this.photoRepository.find();
  }
}
