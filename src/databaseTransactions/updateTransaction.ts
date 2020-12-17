import { queryAsync } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { getWhere } from '../utils';

export const updateAsync = (
  tableName: string,
  values: object,
  where: object
) => {
  return queryAsync(
    `UPDATE ${escapeId(tableName)} SET ? ${getWhere(where)}`,
    values
  );
};
