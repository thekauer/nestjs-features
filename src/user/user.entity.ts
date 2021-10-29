import { ApiProperty } from '@nestjs/swagger';
import { EncryptedColumn } from 'src/config/Encrypt';
import Measurement from 'src/measurement/measurement.entity';
import { Role } from 'src/role/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
const bcrypt = require('bcrypt');

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
  @EncryptedColumn()
  email: string;

  @ApiProperty()
  @EncryptedColumn()
  username: string;

  @ApiProperty()
  @EncryptedColumn()
  password: string;

  @OneToMany(() => Measurement, (measurement) => measurement.user)
  measurements: Measurement[];

  @ApiProperty()
  @ManyToMany(() => Role, (role) => role.id)
  @JoinTable()
  roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
