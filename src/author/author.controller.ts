import { Controller, Get } from '@nestjs/common';
import { UserModel } from 'src/model/User';
import { User } from 'src/decorator/user.decorator';

@Controller('author')
export class AuthorController {
  @Get()
  async findUser(@User() user: UserModel) {
    return `This action returns a #${user}`;
  }
}
