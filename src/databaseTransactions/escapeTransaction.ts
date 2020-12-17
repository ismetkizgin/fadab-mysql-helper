import Mysql from 'mysql';

export const escape = (values: any) => {
  return Mysql.escape(values);
};

export const escapeId = (value: any) => {
  return Mysql.escapeId(value);
};
