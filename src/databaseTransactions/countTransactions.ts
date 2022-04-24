import { queryAsync } from './queryTransaction';
import { escapeId } from './escapeTransaction';
import { createWhere } from '../utils';
import { CountOptions, Count } from '../models';

export const countAsync = async (
  tableName: string,
  options?: CountOptions
): Promise<number> => {
  try {
    return ((<Array<object>>await queryAsync(
        `SELECT COUNT(${options?.distinct ? 'DISTINCT' : ''} ${
          options?.fields ? options.fields.toString() : '*'
        }) as total FROM 
        ${escapeId(tableName)} 
        ${options?.where ? createWhere(options.where) : ''}`
      ))[0] as Count).total;
  } catch (err) {
    throw err;
  }
};
