import { resolve } from 'path';
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

export default Encrypted;
