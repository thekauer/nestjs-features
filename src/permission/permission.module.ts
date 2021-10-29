import { Module } from '@nestjs/common';
import { PermissionsGuard } from './permission.guard';
import { PermissionRepository } from './permission.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [PermissionsGuard, PermissionRepository],
  exports: [PermissionsGuard, PermissionRepository],
})
export class PermissionModule {}
