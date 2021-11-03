import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { ConfiguredJwtModule } from './jwt.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfiguredPassportModule } from './passport.module';

@Module({
  imports: [ConfiguredPassportModule, ConfiguredJwtModule, UserModule],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
