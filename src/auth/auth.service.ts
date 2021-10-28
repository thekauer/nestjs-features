import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/user/role';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ username });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (user) {
      const payload = { username, id: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }
  async register(username: string, password: string) {
    const entity = Object.assign(new User(), {
      username,
      name: username,
      email: `${username}@tapi.hu`,
      role: Role.TRAINEE,
      password: bcrypt.hashSync(password, 10),
    });
    const user = await this.userRepository.save(entity);
    return {
      access_token: this.jwtService.sign({ username, id: user.id }),
    };
  }
}
