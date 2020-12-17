import { queryAsync } from './queryTransaction';
import { selectAsync } from './selectTransaction';
import { findOneAsync } from './findTransaction';
import { insertAsync } from './insertTransaction';
import { updateAsync } from './updateTransaction';
import { deleteAsync } from './deleteTransaction';
import { SelectOptions } from '../models';

export class FadabHelper {
  protected baseTable: string = '';
  constructor() {}

  queryAsync = queryAsync;

  selectAsync(options: SelectOptions) {
    return selectAsync(this.baseTable, options);
  }

  findOneAsync(where: object) {
    return findOneAsync(this.baseTable, where);
  }

  insertAync(values: any, ignore?: boolean) {
    return insertAsync(this.baseTable, values, ignore);
  }

  updateAsync(values: object, where: object) {
    return updateAsync(this.baseTable, values, where);
  }

  deleteAsync(where: object) {
    return deleteAsync(this.baseTable, where);
  }
}
