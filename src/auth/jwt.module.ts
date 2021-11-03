import { JwtModule } from '@nestjs/jwt';

export const ConfiguredJwtModule = JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '60s' },
});
