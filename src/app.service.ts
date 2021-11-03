import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginDTO } from './user/login.dto';
import { RegisterDTO } from './user/register.dto';

@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}
  login({ email, password }: LoginDTO) {
    return this.authService.login(email, password);
  }
  register(registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }
}
