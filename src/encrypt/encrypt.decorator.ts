import { Column, ColumnOptions } from 'typeorm';
import Encrypted from './encrypt';

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

export default EncryptedColumn;
