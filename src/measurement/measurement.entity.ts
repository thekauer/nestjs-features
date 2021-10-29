import { User } from 'src/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { EncryptedColumn } from 'src/config/Encrypt';

import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Measurement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.measurements)
  user: User;

  @ApiProperty()
  @EncryptedColumn()
  heartRate: number;

  @ApiProperty()
  @EncryptedColumn()
  bloodPressure: number;

  @CreateDateColumn()
  createdAt: Date;
}

export default Measurement;
