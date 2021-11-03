import { Permission } from '../permission/permission.entity';
import { Role } from '../role/role.entity';
import { getRepository } from 'typeorm';

export async function roleSeed() {
  const roleRepository = getRepository<Role>('role');
  const permissionRepository = getRepository<Permission>('permission');

  const permissions = await permissionRepository.find();

  const trainer = new Role();
  trainer.slug = 'trainer';
  trainer.permissions = permissions;

  const client = new Role();
  client.slug = 'client';
  const roles = [trainer, client];

  await roleRepository.save(roles);
}
