import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Connection, EntityRepository, Repository } from 'typeorm';
import Measurement from './measurement.entity';

@Injectable()
export class MeasurementRepository {
  private readonly repository: Repository<Measurement>;
  constructor(private readonly connection: Connection) {
    this.repository = connection.getRepository(Measurement);
  }
  createMeasurement(payload: Partial<Measurement>): Promise<Measurement> {
    const measurement = Object.assign(new Measurement(), payload);
    return this.repository.save(measurement);
  }
  findByUser(user: User): Promise<Measurement[]> {
    return this.repository.find({ where: { user } });
  }
  getAll(): Promise<Measurement[]> {
    return this.repository.find();
  }
  deleteAll(): Promise<void> {
    return this.repository.clear();
  }
  deleteById(id: number) {
    return this.repository.delete(id);
  }
  deleteByUserId(userId: number) {
    return this.repository.delete({ user: { id: userId } });
  }
  findByUserId(userId: number): Promise<Measurement[]> {
    return this.repository.find({ where: { user: { id: userId } } });
  }
}
