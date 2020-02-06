import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // to read the handler's decorator metadata, use the get() method.
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());
    if (!roles) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest();
    //TODO: attach user to Request obj at authService
    return this.matchRoles(roles, req.user.roles);
  }

  matchRoles(r, usr) {
    return r == usr;
  }
}
