import { queryAsync } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { DynamicObject } from '../models';

export const insertAsync = (
  tableName: string,
  values: DynamicObject,
  ignore?: boolean
) => {
  return queryAsync(
    `INSERT ${ignore ? ' IGNORE' : ''} INTO ${escapeId(tableName)} SET ?`,
    values
  );
};
