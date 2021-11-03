import { User } from '../user/user.entity';
export interface JwtPayload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export const toJwtPayload = (user: User): JwtPayload => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
});
