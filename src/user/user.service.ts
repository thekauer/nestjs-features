import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
var faker = require('faker');
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  public async create(data: User) {
    const user = Object.assign(new User(), data);
    return await this.userRepository.save(user);
  }
  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
  public async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
  }
  public async generateUser() {
    const entity = Object.assign(new User(), {
      name: faker.name.findName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    const user = await this.userRepository.save(entity);
    return user;
  }
  public async deleteById(id: number) {
    return await this.userRepository.delete({ id });
  }
  public async deleteAll() {
    await this.userRepository.delete({});
  }
}
