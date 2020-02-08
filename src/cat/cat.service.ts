import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICat } from '../interface';
import { CreateCat, UpdateCat } from './model/cat';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CatService {
  // for mongoose
  constructor(
    @InjectModel('Cat') private readonly catModel: Model<any>,
    private readonly configService: ConfigService,
  ) {}

  async create(cat: CreateCat): Promise<ICat> {
    const createdCat = new this.catModel(cat);
    return await createdCat.save();
  }

  async findAll(): Promise<ICat[]> {
    console.log('.env:', this.configService.get<string>('DB_DATABASE'));
    return await this.catModel.find().exec();
  }
}
