import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user/user.repository';
import { fakeRegisterDto } from '../../fake/user/register.dto.fake';
import { fakeUserRepositoryProvider } from '../../fake/user/user.repository.fake';
import { AuthService } from './auth.service';
import { ConfiguredJwtModule } from './jwt.module';

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: UserRepository;

  beforeEach(async () => {
    jest.resetModules();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfiguredJwtModule],
      providers: [AuthService, fakeUserRepositoryProvider()],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('register', () => {
    it('should register new user', async () => {
      const user = fakeRegisterDto();
      const { access_token } = await service.register(user);
      expect(access_token).toBeDefined();
    });

    it('should say that user is already registered', async () => {
      const user = fakeRegisterDto();
      const { access_token } = await service.register(user);
      expect(access_token).toBeDefined();
      await expect(service.register(user)).rejects.toThrow();
    });
  });
  describe('login', () => {
    it('should login user', async () => {
      const user = fakeRegisterDto();
      const { access_token } = await service.register(user);
      expect(access_token).toBeDefined();
      const { access_token: access_token2 } = await service.login(
        user.email,
        user.password,
      );
      expect(access_token2).toBeDefined();
    });

    it('should not login user', async () => {
      const user = fakeRegisterDto();
      user.password = 'good password';
      const { access_token } = await service.register(user);
      expect(access_token).toBeDefined();
      await expect(
        service.login(user.email, 'wrong password'),
      ).rejects.toThrow();
    });
  });
});
