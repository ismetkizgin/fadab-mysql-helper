import { queryAsync } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { createWhere } from '../utils';
import { Where, DynamicObject, WhereAdvancedObject } from '../models';

export const deleteAsync = (
  tableName: string,
  where: Where | DynamicObject | Array<WhereAdvancedObject>
) => {
  return queryAsync(`DELETE FROM ${escapeId(tableName)} ${createWhere(where)}`);
};
