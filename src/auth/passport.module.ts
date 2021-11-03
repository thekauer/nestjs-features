import { PassportModule } from '@nestjs/passport';

export const ConfiguredPassportModule = PassportModule.register({
  defaultStrategy: 'jwt',
  property: 'user',
  session: false,
});
