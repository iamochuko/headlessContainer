import {
  IsString,
  IsInt,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class UserModel {
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  @IsInt()
  readonly age: number;
}

export class FindOneParams {
  @IsNumberString()
  readonly id: string;
}
