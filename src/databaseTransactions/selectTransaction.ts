import { query } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { getWhere, getLimitOffset } from '../utils';
import { SelectOptions } from '../models';

export const select = (tableName: string, options?: SelectOptions) => {
  return query(
    `SELECT ${
      options?.fields ? options.fields.toString() : '*'
    } FROM ${escapeId(tableName)} ${
      options?.where ? getWhere(options.where) : ''
    } ${getLimitOffset(options?.limit, options?.offset)}`
  );
};
