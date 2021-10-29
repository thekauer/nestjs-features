import { Role } from 'src/role/role.entity';
export interface JwtPayload {
  id: number;
  email: string;
  username: string;
  roles: Role[];
}
