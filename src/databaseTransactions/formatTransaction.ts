import Mysql from 'mysql';

export const format = (query: string, values: any[]) => {
  return Mysql.format(query, values);
};
