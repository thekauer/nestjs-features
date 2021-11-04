import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export class FakeRepository<T> {
  constructor(private readonly entities: T[] = []) {}

  findOne = jest.fn().mockImplementation(async (entity: Partial<T>) => {
    return this.entities.find((e) =>
      Object.keys(entity).every((k) => e[k] === entity[k]),
    );
  });
  save = jest.fn().mockImplementation(async (entity: T) => {
    this.entities.push();
    return entity;
  });
  findAll = jest.fn().mockImplementation(async () => {
    return this.entities;
  });
}

export const fakeRepositoryProvider = <P extends EntityClassOrSchema, T>(
  provide: P,
  entities: T[] = [],
) => ({
  provide: getRepositoryToken(provide),
  useValue: new FakeRepository<T>(entities),
});
