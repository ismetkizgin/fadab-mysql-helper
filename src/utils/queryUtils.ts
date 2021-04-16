import Mysql from 'mysql';

export const getWhere = (object: object) => {
  let where = 'WHERE ';
  for (const [key, value] of Object.entries(object))
    where +=
      where === 'WHERE '
        ? `${Mysql.escapeId(key)}=${Mysql.escape(value)}`
        : ` and ${Mysql.escapeId(key)}=${Mysql.escape(value)}`;

  return where === 'WHERE ' ? '' : where;
};

export const getLimitOffset = (limit?: number, offset?: number) => {
  return offset == null
    ? `${limit == null ? '' : `LIMIT ${limit}`}`
    : `LIMIT ${offset},${limit}`;
};
