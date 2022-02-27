import { DynamicObject } from '../models';
import { queryAsync } from './queryTransaction';
import { escapeId } from './escapeTransaction';

export const bulkInsertAsync = (
  tableName: string,
  values: Array<DynamicObject>,
  ignore?: boolean
) => {
  if (!values || values.length == 0)
    throw new Error('The values parameter cannot be sent blank.');

  const fields: Array<string> = Object.keys(values[0]);
  let valueArray: Array<any>;
  const mapValuesArray = values.map(value => {
    valueArray = [];
    for (const field of fields) valueArray.push(value[field]);
    return valueArray;
  });
  return queryAsync(
    `INSERT ${ignore ? ' IGNORE' : ''} INTO ${escapeId(
      tableName
    )} (${fields.toString()}) VALUES ?`,
    [mapValuesArray]
  );
};
