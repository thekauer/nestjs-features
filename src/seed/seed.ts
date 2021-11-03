import { resolve } from 'path';
require('dotenv').config({
  path: resolve(__dirname, '../..', '.env'),
});
const ormconfig = require('../config/ormconfig');
import { createConnection } from 'typeorm';
import { permissionSeed } from './permission.seed';
import { roleSeed } from './role.seed';

export async function seed(): Promise<void> {
  await createConnection(ormconfig);

  await permissionSeed();
  await roleSeed();
}

console.log('Seeding');
seed()
  .then(() => console.log('Completed!'))
  .catch(console.error);
