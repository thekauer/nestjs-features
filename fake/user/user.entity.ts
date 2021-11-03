import { Role } from '../../src/role/role.entity';

const faker = require('faker');

export const fakeUser = () => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  roles: [] as Role[],
  hashPassword: async () => {},
});
