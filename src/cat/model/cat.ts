import { IsInt, IsString } from 'class-validator';

export class CreateCat {
  @IsString()
  readonly name: string;
  @IsInt()
  readonly age: number;
  @IsString()
  readonly breed: string;
}

export class UpdateCat {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

export class ListAllEntities {
  readonly limit: number;
}
