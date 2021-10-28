import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import Measurement from './measurement.entity';
var faker = require('faker');
import { MeasurementRepository } from './measurement.repository';

@Injectable()
export class MeasurementService {
  constructor(private readonly measurementRepository: MeasurementRepository) {}
  public async getAll(): Promise<Measurement[]> {
    return await this.measurementRepository.getAll();
  }
  public async create(measurement: Partial<Measurement>) {
    return await this.measurementRepository.createMeasurement(measurement);
  }
  public async findByUser(user: User): Promise<Measurement[]> {
    return await this.measurementRepository.findByUser(user);
  }
  public async generateMeasurement(user: Partial<User>): Promise<Measurement> {
    return await this.measurementRepository.createMeasurement({
      bloodPressure: faker.datatype.number({ min: 80, max: 120 }).toString(),
      heartRate: faker.datatype.number({ min: 60, max: 100 }).toString(),
      user: user as User,
    });
  }
  public async generateManyMeasurements(user: User, count: number) {
    const measurements: Measurement[] = [];
    for (let i = 0; i < count; i++) {
      measurements.push(await this.generateMeasurement(user));
    }
    return measurements;
  }
  public async deleteAll() {
    return await this.measurementRepository.deleteAll();
  }
  public async deleteById(id: number) {
    return await this.measurementRepository.deleteById(id);
  }
}
