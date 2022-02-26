import { queryAsync } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { getWhere, getLimitOffset } from '../utils';
import { SelectOptions } from '../models';

export const selectAsync = (tableName: string, options?: SelectOptions) => {
  try {
    return queryAsync(
      `SELECT ${options?.distinct ? 'DISTINCT' : ''} ${
        options?.fields ? options.fields.toString() : '*'
      } FROM 
      ${escapeId(tableName)} 
      ${options?.where ? getWhere(options.where) : ''} 
      ${
        options?.orderBy
          ? `ORDER BY ${options.orderBy.fields.toString()} ${
              options.orderBy.ranking
            }`
          : ''
      }
      ${getLimitOffset(options?.limit, options?.offset)}`
    );
  } catch (err) {
    throw err;
  }
};
