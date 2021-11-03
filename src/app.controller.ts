import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Jwt, User } from './auth/jwt.decorator';
import { Permissions } from './permission/permissions';
import { LoginDTO } from './user/login.dto';
import { Perm } from './permission/perm.decorator';
import { JwtPayload } from './auth/jwt.dto';
import { RegisterDTO } from './user/register.dto';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.appService.login(loginDTO);
  }

  @Post('register')
  register(@Body() registerDTO: RegisterDTO) {
    return this.appService.register(registerDTO);
  }

  @Jwt()
  @Get('home')
  home(@User() user: JwtPayload) {
    return `home of ${user.firstName} ${user.lastName}`;
  }

  @Jwt()
  @Perm(Permissions.VIEW_TRAINER_HOME)
  @Get('trainer-home')
  trainerHome(@User() user: JwtPayload) {
    return `trainer home ${user.firstName} ${user.lastName}`;
  }
}
