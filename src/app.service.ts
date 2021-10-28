import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { MeasurementService } from './measurement/measurement.service';
import { UserService } from './user/user.service';
const faker = require('faker');

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly measurementService: MeasurementService,
  ) {}
  async generate(count: number) {
    const users = [];
    for (let i = 0; i < count; i++) {
      const user = await this.userService.generateUser();
      const measurements = this.measurementService.generateManyMeasurements(
        user,
        faker.datatype.number(10),
      );
      users.push({ user, measurements });
    }
    return users;
  }
  login(username: string, password: string) {
    return this.authService.login(username, password);
  }
  register(username: string, password: string) {
    return this.authService.register(username, password);
  }
  deleteAll() {
    this.measurementService.deleteAll();
    return this.userService.deleteAll();
  }
  async getMeasurementsForUser(userId: number) {
    const user = await this.userService.findById(userId);
    return this.measurementService.findByUser(user);
  }

  async measure(userId: number) {
    const user = await this.userService.findById(userId);
    return this.measurementService.generateMeasurement(user);
  }
  async measureMany(userId: number) {
    const user = await this.userService.findById(userId);
    return this.measurementService.generateManyMeasurements(
      user,
      faker.datatype.number(10),
    );
  }
}
