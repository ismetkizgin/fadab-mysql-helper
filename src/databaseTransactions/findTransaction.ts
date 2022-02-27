import { selectAsync } from './selectTransaction';
import { DynamicObject, Where } from '../models';

export const findOneAsync = async (
  tblName: string,
  where: Where | DynamicObject
) => {
  return (<Array<object>>await selectAsync(tblName, { where }))[0];
};
