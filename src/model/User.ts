import { IsString, IsInt } from "class-validator";


export class UserModel {
         @IsString()
         readonly name: string;
         @IsInt()
         readonly age: number;
       }
