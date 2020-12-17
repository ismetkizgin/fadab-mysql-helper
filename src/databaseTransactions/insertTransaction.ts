import { query } from './queryTransaction';
import { escapeId } from './escapeTransaction';

export const insert = (tableName: string, values: any, ignore?: boolean) => {
  return query(
    `INSERT ${ignore ? ' IGNORE' : ''} INTO ${escapeId(tableName)} SET ?`,
    values
  );
};
