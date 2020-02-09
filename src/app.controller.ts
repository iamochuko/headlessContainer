import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  HttpException,
  ForbiddenException,
  Body,
  CacheKey,
  CacheTTL,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @CacheKey('appCtrl')
  @CacheTTL(20)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards - This Guard uses the Passport-local strategy and kicks off the
  // steps of retrieving credentials, running the verify function, creating the user property, etc.
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    try {
      const res = await this.authService.login(req.user);
      return res ? res : { err: 'Not Authorised!' };
    } catch (err) {
      throw new HttpException('Bad Response', 302);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profile(@Request() req: any) {
    try {
      if (req.user) {
        return req.user;
      }
      throw new ForbiddenException();
    } catch (error) {
      throw new HttpException('Bad Response', 302);
    }
  }

  
}
