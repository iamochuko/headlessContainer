import { Injectable } from '@nestjs/common';
import { ICat } from '../interface';

@Injectable()
export class CatService {
  private readonly cats: ICat[] = [{ name: 'Jampack', age: 22, breed: 'Tigerrian'}];

  async create(cat: ICat) {
    await this.cats.push(cat);
  }

  async findAll(): Promise<ICat[]> {
    return this.cats;
  }
}
