import { queryAsync } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { getWhere } from '../utils';
import { Where, DynamicObject, WhereAdvancedObject } from '../models';

export const updateAsync = (
  tableName: string,
  values: DynamicObject,
  where: Where | DynamicObject | Array<WhereAdvancedObject>
) => {
  return queryAsync(
    `UPDATE ${escapeId(tableName)} SET ? ${getWhere(where)}`,
    values
  );
};
