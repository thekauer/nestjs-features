const faker = require('faker');

export const fakeRegisterDto = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  roleId: 1,
});
