import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { User } from '../decorator/user.decorator';
import { UserModel, FindOneParams } from './model/User';

@Controller('api/author')
export class AuthorController {
  @Get()
  async findUser(@User() user: UserModel) {
    return `This action returns a #${user}`;
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return `this para is: ${params.id}`;
  }

  @Post('create')
  async createUser(@Body() user: UserModel) {
    return `this action creates a new user ${user}`;
  }
}
