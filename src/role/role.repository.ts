import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleRepository {
  private readonly repository: Repository<Role>;
  constructor(private readonly connection: Connection) {
    this.repository = connection.getRepository(Role);
  }
}
