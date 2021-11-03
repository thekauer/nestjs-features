import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permissions } from './permissions';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchPermissions(
    permissions: Permissions[],
    userPermissions: Permissions[],
  ): boolean {
    return permissions.some((role) => userPermissions.includes(role));
  }

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<Permissions[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return false;
    }
    return this.matchPermissions(permissions, user.permissions);
  }
}
