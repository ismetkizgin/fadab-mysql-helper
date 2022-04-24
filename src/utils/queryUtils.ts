import Mysql from 'mysql';
import { Where, DynamicObject, WhereAdvancedObject, OrderBy } from '../models';

export const createWhere = (
  objects: Where | DynamicObject | Array<WhereAdvancedObject>
) => {
  let where = _createWhere(objects);
  return where === '' ? '' : `WHERE ${where}`;
};

export const getLimitOffset = (limit?: number, offset?: number) => {
  return offset == null
    ? `${limit == null ? '' : `LIMIT ${limit}`}`
    : `LIMIT ${offset},${limit}`;
};

const _createWhere = (
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
          ? _createWhere(value, key)
          : ` and ${_createWhere(value, key)}`;
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
    case 'gt':
      return `${Mysql.escapeId(object.key)} > ${Mysql.escape(object.value)}`;
    case 'gte':
      return `${Mysql.escapeId(object.key)} >= ${Mysql.escape(object.value)}`;
    case 'lt':
      return `${Mysql.escapeId(object.key)} < ${Mysql.escape(object.value)}`;
    case 'lte':
      return `${Mysql.escapeId(object.key)} <= ${Mysql.escape(object.value)}`;
    default:
      return '';
  }
};

export const createOrderBy = (
  objects: OrderBy | Array<OrderBy>,
  isRandom?: boolean
) => {
  let orderBy = [];
  if (isRandom) orderBy.push('RAND()');
  if (Array.isArray(objects))
    for (const object of objects)
      orderBy.push(`${object.field} ${object.ranking}`);
  else orderBy.push(`${objects.field} ${objects.ranking}`);
  return orderBy.length > 0 ? `ORDER BY ${orderBy.toString()}` : '';
};
