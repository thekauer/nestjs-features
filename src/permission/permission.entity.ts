import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  slug: string;

  @ManyToMany(() => Role, (role) => role.id)
  roles: Role[];
}
