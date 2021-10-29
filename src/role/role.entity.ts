import { ApiProperty } from '@nestjs/swagger';
import { Permission } from 'src/permission/permission.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany((_) => Permission, (permission) => permission.role)
  permissions: Permission[];
  @ManyToMany((_) => User, (user) => user.roles)
  users: User[];
}
