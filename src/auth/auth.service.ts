import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { RegisterDTO } from '../user/register.dto';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { toJwtPayload } from './jwt.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ email });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (user) {
      return {
        access_token: this.sign(user),
      };
    }
    return null;
  }
  async register(registerDTO: RegisterDTO) {
    if (await this.userRepository.findOne({ email: registerDTO.email })) {
      throw new HttpException('Email already exists', 409);
    }
    const role = { id: registerDTO.roleId };
    const entity = Object.assign(new User(), { ...registerDTO, role });
    const user = await this.userRepository.save(entity);
    return {
      access_token: this.sign(user),
    };
  }
  sign(payload: User, options?: JwtSignOptions): string {
    return this.jwtService.sign(toJwtPayload(payload), options);
  }
}
