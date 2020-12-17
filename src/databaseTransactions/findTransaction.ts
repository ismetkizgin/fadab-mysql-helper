import { selectAsync } from './selectTransaction';

export const findOneAsync = async (tblName: string, where: object) => {
  return (<Array<object>>await selectAsync(tblName, { where }))[0];
};
