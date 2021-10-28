import { ApiProperty } from '@nestjs/swagger';
import Encrypt from 'src/config/Encrypt';
import Measurement from 'src/measurement/measurement.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Role } from './role';
const bcrypt = require('bcrypt');

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  /*
CREATE OR REPLACE FUNCTION mydecrypt(s text) RETURNS bytea AS $$
        BEGIN
                RETURN substring(
                    decrypt_iv(
                        decode(s,'base64'::text)::bytea,
                        'verystrongkeyyyy'::bytea,
                        'verystrongivvvvv'::bytea,
                        'aes-cbc/pad:none'::text),
                    17);
        END;
$$ LANGUAGE plpgsql;
*/
  @ApiProperty()
  @Column({
    type: 'varchar',
    transformer: Encrypt(),
  })
  email: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    transformer: Encrypt(),
  })
  username: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    transformer: Encrypt(),
  })
  password: string;

  @OneToMany(() => Measurement, (measurement) => measurement.user)
  measurements: Measurement[];

  @ApiProperty()
  @Column({ type: 'enum', enum: Role, default: Role.TRAINEE })
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
