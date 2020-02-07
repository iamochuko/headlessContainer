import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, pwd: string): Promise<any> {
    try {
      // If a user is found and the credentials are valid, the user is returned so Passport can complete its tasks (e.g., creating the user property on the Request object), and the request handling pipeline can continue.
      const user = await this.authService.validateUser(username, pwd);
      if (user) {
        return user;
      }

      // Passport automatically creates a user object, based on the value we return from the validate() method, and assigns it to the Request object as req.user.
      throw new UnauthorizedException();
    } catch (err) {
      throw new HttpException('Bad response', 302);
    }
  }
}
