import { Module } from '@nestjs/common';
import { PermissionsGuard } from './permission.guard';

@Module({
  imports: [],
  controllers: [],
  providers: [PermissionsGuard],
  exports: [PermissionsGuard],
})
export class PermissionModule {}
