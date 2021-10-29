import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from './permission';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchPermissions(
    permissions: Permission[],
    userPermissions: Permission[],
  ): boolean {
    return permissions.some((role) => userPermissions.includes(role));
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Permission[]>(
      'permissions',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchPermissions(roles, user.permissions);
  }
}
