import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('authorization', () => {
    describe('register', () => {
      it('/register (POST)', () => {
        return request(app.getHttpServer())
          .post('/register')
          .send({})
          .expect(200);
      });
    });
    describe('login', () => {
      it('/login (POST)', () => {
        return request(app.getHttpServer()).post('/login').send({}).expect(200);
      });
    });
  });
});
