import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorService } from './author.service';
import { AuthorRepository } from './AuthorRepository';
import { AuthorController } from './author.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  providers: [AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
