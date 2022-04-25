import { queryAsync } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { createWhere, getLimitOffset, createOrderBy } from '../utils';
import { SelectOptions } from '../models';

export const selectAsync = (tableName: string, options?: SelectOptions) => {
  try {
    return queryAsync(
      `SELECT ${options?.distinct ? 'DISTINCT' : ''} ${
        options?.fields ? options.fields.toString() : '*'
      } FROM 
      ${escapeId(tableName)} 
      ${options?.where ? createWhere(options.where) : ''} 
      ${
        options?.orderBy
          ? createOrderBy(options.orderBy, options?.isRandom)
          : ''
      }
      ${getLimitOffset(options?.limit, options?.offset)}`
    );
  } catch (err) {
    throw err;
  }
};
