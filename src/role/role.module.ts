import { Module } from '@nestjs/common';
import { RoleRepository } from './role.repository';

@Module({
  controllers: [],
  providers: [RoleRepository],
  exports: [RoleRepository],
})
export class RoleModule {}
