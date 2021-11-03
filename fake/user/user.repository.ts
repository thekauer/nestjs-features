import { User } from 'src/user/user.entity';
import { UserRepository } from '../../src/user/user.repository';
import { fakeUser } from './user.entity';

export class FakeUserRepository {
  constructor(private readonly users = [fakeUser()]) {}

  findOne = jest.fn().mockResolvedValue(fakeUser());
}

export const fakeUserRepositoryProvider = (users?: User[]) => ({
  provide: UserRepository,
  useValue: new FakeUserRepository(users),
});
