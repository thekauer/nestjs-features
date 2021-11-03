import { Permissions } from '../permission/permissions';
import { getRepository } from 'typeorm';
import { Permission } from '../permission/permission.entity';

export async function permissionSeed() {
  const permissionRepository = getRepository<Permission>('permission');

  const permissionsInDatabase = await permissionRepository.find();
  const permissions = Object.values(Permissions);

  const permissionsToCreate = permissions.filter(
    (permission) => !permissionsInDatabase.find((p) => p.slug === permission),
  );
  const permissionsToDelete = permissionsInDatabase.filter(
    (permission) => !permissions.find((p) => p === permission.slug),
  );

  await permissionRepository.remove(permissionsToDelete);
  await permissionRepository.save(
    permissionsToCreate.map((permission) => ({ slug: permission })),
  );
}
