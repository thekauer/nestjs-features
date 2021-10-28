import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './auth/jwt.decorator';
import { LoginDto } from './user/login.dto';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('generate/:count')
  generate(@Param('count') count: number) {
    return this.appService.generate(count);
  }
  @Delete('deleteAll')
  deleteAll() {
    return this.appService.deleteAll();
  }

  @Post('login')
  login(@Body() { username, password }: LoginDto) {
    return this.appService.login(username, password);
  }
  @Post('register')
  register(@Body() { username, password }: LoginDto) {
    return this.appService.register(username, password);
  }
  @Get('measurements')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  measurements(@User() user) {
    return this.appService.getMeasurementsForUser(user.id);
  }
  @Get('measure')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  measure(@User() user) {
    return this.appService.measure(user.id);
  }
  @Get('measure-many')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  measureMany(@User() user) {
    return this.appService.measureMany(user.id);
  }
}
