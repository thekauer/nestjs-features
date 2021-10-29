import { Column, ColumnOptions } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

const Encrypted = () => {
  if (process.env.ENCRYPTION_KEY.length !== 32) {
    throw new Error('Encryption key must be 32 characters long');
  }
  if (process.env.ENCRYPTION_IV.length !== 32) {
    throw new Error('Encryption IV must be 32 characters long');
  }
  const EncryptionTransformerConfig = {
    key: process.env.ENCRYPTION_KEY,
    algorithm: 'aes-128-cbc',
    ivLength: 16,
    iv: process.env.ENCRYPTION_IV,
  };

  return new EncryptionTransformer(EncryptionTransformerConfig);
};

export const EncryptedColumn = (options?: ColumnOptions): PropertyDecorator => {
  return function (object: Object, propertyName: string) {
    if (options) {
      if (options?.type && options?.type !== 'varchar') {
        throw new Error('Encrypted column must be of type varchar');
      }
      if (options?.transformer) {
        throw new Error('Encrypted column cannot have a transformer');
      }
    }
    const newOptions: ColumnOptions = {
      ...options,
      type: 'varchar',
      transformer: Encrypted(),
    };
    Column(newOptions)(object, propertyName);
  };
};

export default Encrypted;
