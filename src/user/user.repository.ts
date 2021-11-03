import { Injectable } from '@nestjs/common';
import { Connection, Repository, Transaction } from 'typeorm';
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

  async save(user: Partial<User>): Promise<User> {
    return this.userRepository.save(new User(user));
  }

  async delete(user: Partial<User>): Promise<User> {
    return this.userRepository.remove(user);
  }
  async deleteALl(): Promise<void> {
    return await this.userRepository.clear();
  }
}
