import { queryAsync } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { getWhere } from '../utils';

export const deleteAsync = (tableName: string, where: object) => {
  return queryAsync(`DELETE FROM ${escapeId(tableName)} ${getWhere(where)}`);
};
