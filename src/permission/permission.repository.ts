import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionRepository {
  private readonly repository: Repository<Permission>;
  constructor(private readonly connection: Connection) {
    this.repository = connection.getRepository(Permission);
  }
}
