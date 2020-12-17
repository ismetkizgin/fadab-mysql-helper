import { query } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { getWhere } from '../utils';

export const update = (tableName: string, values: object, where: object) => {
  return query(
    `UPDATE ${escapeId(tableName)} SET ? ${getWhere(where)}`,
    values
  );
};
