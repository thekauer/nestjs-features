import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import Measurement from 'src/measurement/measurement.entity';
import { User } from './user.entity';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService) {}
  @Post('create')
  createUser(@Body() data: User): User {
    return this.userService.create(data);
  }
  @Get()
  findUser(): User[] {
    return this.userService.findAll();
  }
  @Get('generate')
  generateUser(): User {
    return this.userService.generateUser();
  }
  @Get(':id')
  findUserById(@Param('id') id: number): User {
    return this.userService.findById(id);
  }
  @Post(':id/create')
  createMeasurement(
    @Body() data: Measurement,
    @Param('id') id: number,
  ): Measurement {
    return this.userService.createMeasurementForUser(id, data);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number): User {
    return this.userService.deleteById(id);
  }
}
