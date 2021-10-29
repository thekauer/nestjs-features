import { ApiProperty } from '@nestjs/swagger';
import { EncryptedColumn } from 'src/config/Encrypt';
import { Role } from 'src/role/role.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @EncryptedColumn()
  name: string;

  @ApiProperty()
  @EncryptedColumn()
  description: string;

  @ManyToOne((_) => Role, (role) => role.id)
  role: Role;
}
