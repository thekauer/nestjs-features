import { SetMetadata } from '@nestjs/common';
import { Permission } from './permission';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata('permissions', permissions);
