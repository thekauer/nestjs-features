import { User } from 'src/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import Encrypt from 'src/config/Encrypt';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @Column({
    type: 'varchar',
    transformer: Encrypt(),
  })
  heartRate: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
    transformer: Encrypt(),
  })
  bloodPressure: number;

  @CreateDateColumn()
  createdAt: Date;
}

export default Measurement;
