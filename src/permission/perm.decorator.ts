import { SetMetadata } from '@nestjs/common';
import { Permissions } from './permissions';

export const Perm = (...permissions: Permissions[]) =>
  SetMetadata('permissions', permissions);
