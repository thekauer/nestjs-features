import { User } from 'src/user/user.entity';
import { UserRepository } from '../../src/user/user.repository';
const bcrypt = require('bcrypt');

export class FakeUserRepository {
  constructor(private readonly users = []) {}

  findOne = jest.fn().mockImplementation(async (user: Partial<User>) => {
    return this.users.find((u) =>
      Object.keys(user).every((k) => u[k] === user[k]),
    );
  });
  save = jest.fn().mockImplementation(async (user: User) => {
    this.users.push({ ...user, password: bcrypt.hashSync(user.password, 10) });
    return user;
  });
  findAll = jest.fn().mockImplementation(async () => {
    return this.users;
  });
}

export const fakeUserRepositoryProvider = (users?: User[]) => ({
  provide: UserRepository,
  useValue: new FakeUserRepository(users),
});
