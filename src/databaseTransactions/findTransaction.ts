import { select } from './selectTransaction';

export const findOneAsync = async (tblName: string, where: object) => {
  return (<Array<object>>await select(tblName, { where }))[0];
};
