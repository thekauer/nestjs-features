import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  private readonly userRepository;
  constructor(private readonly connection: Connection) {
    this.userRepository = connection.getRepository(User);
  }

  async findOne(user: Partial<User>): Promise<User | undefined> {
    return this.userRepository.findOne(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  async delete(user: Partial<User>): Promise<User> {
    return this.userRepository.remove(user);
  }
}
