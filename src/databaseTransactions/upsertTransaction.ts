import { queryAsync } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { DynamicObject } from '../models';

export const upsertAsync = (tableName: string, values: DynamicObject) => {
  return queryAsync(
    `INSERT INTO ${escapeId(tableName)} SET ? ON DUPLICATE KEY UPDATE ?`,
    [values, values]
  );
};
