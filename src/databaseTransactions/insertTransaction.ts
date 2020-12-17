import { queryAsync } from './queryTransaction';
import { escapeId } from './escapeTransaction';

export const insertAsync = (
  tableName: string,
  values: any,
  ignore?: boolean
) => {
  return queryAsync(
    `INSERT ${ignore ? ' IGNORE' : ''} INTO ${escapeId(tableName)} SET ?`,
    values
  );
};
