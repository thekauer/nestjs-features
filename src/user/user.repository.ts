import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor() {
    super();
  }

  async save(user: Partial<User> | any): Promise<User | any> {
    return super.save(new User(user));
  }
}
