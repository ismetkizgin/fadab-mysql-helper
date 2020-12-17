import { query } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { getWhere } from '../utils';

export const remove = (tableName: string, where: object) => {
  return query(`DELETE FROM ${escapeId(tableName)} ${getWhere(where)}`);
};
