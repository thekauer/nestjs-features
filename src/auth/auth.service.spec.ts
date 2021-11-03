import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { fakeRegisterDto } from '../../fake/user/register.dto';
import { fakeUserRepositoryProvider } from '../../fake/user/user.repository';
import { AuthService } from './auth.service';
import { ConfiguredJwtModule } from './jwt.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.resetModules();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfiguredJwtModule],
      providers: [AuthService, fakeUserRepositoryProvider()],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('register', () => {
    it('should validate email', () => {
      const user = fakeRegisterDto();
      const email = '';
      expect(service.register({ ...user, email })).toThrow();
    });
  });
});
