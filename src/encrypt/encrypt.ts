import { EncryptionOptions, EncryptionTransformer } from 'typeorm-encrypted';

class CustomEncryptionTransformer extends EncryptionTransformer {
  private myOptions;
  constructor(options: EncryptionOptions) {
    super(options);
    this.myOptions = options;
  }

  public from(value?: string | null): string | undefined {
    if (!value) {
      return;
    }

    const encrypted = Buffer.from(value, 'base64');
    const iv = Buffer.from(this.myOptions.iv, 'hex');
    const concated = Buffer.concat([iv, encrypted]);
    return super.from(concated.toString('base64'));
  }

  public to(value?: string | null): string | undefined {
    if ((value ?? null) === null) {
      return;
    }

    const encrypted = Buffer.from(super.to(value), 'base64');
    const cut = Buffer.from(encrypted.toString('hex').substr(32), 'hex');
    return cut.toString('base64');
  }
}

const Encrypted = () => {
  if (process.env.ENCRYPTION_KEY.length !== 64) {
    throw new Error('Encryption key must be 64 characters long');
  }
  if (process.env.ENCRYPTION_IV.length !== 32) {
    throw new Error('Encryption IV must be 32 characters long');
  }
  const EncryptionTransformerConfig = {
    key: process.env.ENCRYPTION_KEY,
    algorithm: 'aes-256-cbc',
    ivLength: 16,
    iv: process.env.ENCRYPTION_IV,
  };

  return new CustomEncryptionTransformer(EncryptionTransformerConfig);
};

export default Encrypted;
