import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JWT_OPTIONS } from '../lib/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_OPTIONS.secret,
    });
  }

  async validate(payload: any) {
    try {
      //TODO: check for user in db
      //console.log('payload:', payload)
      if (payload) {
        return { userId: payload.sub, username: payload.username };
      }
      throw new UnauthorizedException();
    } catch (err) {
      throw new HttpException('Bad request', 301);
    }
  }
}
