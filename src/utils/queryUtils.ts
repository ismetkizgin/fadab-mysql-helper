import Mysql from 'mysql';
import { Where, DynamicObject, WhereAdvancedObject } from '../models';

export const getWhere = (
  objects: Where | DynamicObject | Array<WhereAdvancedObject>
) => {
  let where = createWhere(objects);
  return where === '' ? '' : `WHERE ${where}`;
};

export const getLimitOffset = (limit?: number, offset?: number) => {
  return offset == null
    ? `${limit == null ? '' : `LIMIT ${limit}`}`
    : `LIMIT ${offset},${limit}`;
};

const createWhere = (
  objects: Where | DynamicObject | Array<WhereAdvancedObject>,
  conditionKey?: string
): string => {
  let where;
  if (Array.isArray(objects)) where = createArrayWhere(objects, conditionKey);
  else where = createObjectWhere(objects, conditionKey);
  return where;
};

const createObjectWhere = (
  objects: Where | DynamicObject | Array<WhereAdvancedObject>,
  conditionKey?: string
): string => {
  let where = '';
  for (const [key, value] of Object.entries(objects))
    if (key === '_or' || key === '_and')
      where +=
        where === ''
          ? createWhere(value, key)
          : ` and ${createWhere(value, key)}`;
    else
      where +=
        where === ''
          ? `${Mysql.escapeId(key)}=${Mysql.escape(value)}`
          : ` ${conditionKey?.replace('_', '') || 'and'} ${Mysql.escapeId(
              key
            )}=${Mysql.escape(value)}`;
  return `(${where})`;
};

const createArrayWhere = (
  objects: Array<WhereAdvancedObject>,
  conditionKey?: string
) => {
  let where = '';
  for (const object of objects) {
    where +=
      where === ''
        ? advenedCondition(object)
        : ` ${conditionKey?.replace('_', '') || 'and'} ${advenedCondition(
            object
          )}`;
  }

  return `(${where})`;
};

const advenedCondition = (object: WhereAdvancedObject): string => {
  switch (object.conditionType) {
    case 'eq':
      return `${Mysql.escapeId(object.key)} = ${Mysql.escape(object.value)}`;
    case 'not_eq':
      return `${Mysql.escapeId(object.key)} != ${Mysql.escape(object.value)}`;
    case 'in':
      let inValue = '';
      if (Array.isArray(object.value))
        for (const value of object.value)
          inValue +=
            inValue == '' ? Mysql.escape(value) : `,${Mysql.escape(value)}`;
      else inValue = Mysql.escape(object.value);
      return `${Mysql.escapeId(object.key)} in (${inValue})`;
    case 'like':
      return `${Mysql.escapeId(object.key)} like ${Mysql.escape(object.value)}`;
    default:
      return '';
  }
};
