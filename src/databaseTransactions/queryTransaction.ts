import connection from './_connectionTransaction';
const _dataContext = connection();

export const query = (query: string, values?: object | Array<object>) => {
  return new Promise((resolve, reject) => {
    _dataContext.query(query, values, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
