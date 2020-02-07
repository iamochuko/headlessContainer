import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pwd: string): Promise<any> {
    try {
      const user = await this.userService.findOne(username);
      if (user && user.password == pwd) {
        delete user.password;
        return user;
      } else {
        return null;
      }
    } catch (err) {
      throw new HttpException('Not vaildated', 302);
    }
  }

  async login(user: any) {
      // jwt 
    return {
      token: this.jwtService.sign({
        username: user.username,
        sub: user.userId,
      }),
    };
  }
}
