import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../permission/permission.entity';
import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  slug: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];
  @ManyToMany(() => User, (user) => user.id)
  users: User[];
}
