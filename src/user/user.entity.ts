import { ApiProperty } from '@nestjs/swagger';
import EncryptedColumn from '../encrypt/encrypt.decorator';
import { Role } from '../role/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  Column,
} from 'typeorm';
const bcrypt = require('bcrypt');

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @EncryptedColumn({ unique: true })
  email: string;

  @ApiProperty()
  @EncryptedColumn()
  firstName: string;

  @ApiProperty()
  @EncryptedColumn()
  lastName: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @ManyToMany(() => Role, (role) => role.id)
  @JoinTable()
  roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
