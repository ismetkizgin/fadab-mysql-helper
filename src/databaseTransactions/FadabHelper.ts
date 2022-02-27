import { queryAsync } from './queryTransaction';
import { selectAsync } from './selectTransaction';
import { findOneAsync } from './findTransaction';
import { insertAsync } from './insertTransaction';
import { updateAsync } from './updateTransaction';
import { deleteAsync } from './deleteTransaction';
import {
  SelectOptions,
  Where,
  DynamicObject,
  WhereAdvancedObject
} from '../models';

export class FadabHelper {
  protected baseTable: string = '';
  constructor() {}

  queryAsync = queryAsync;

  selectAsync(options: SelectOptions) {
    return selectAsync(this.baseTable, options);
  }

  findOneAsync(where: Where | DynamicObject) {
    return findOneAsync(this.baseTable, where);
  }

  insertAsync(values: any, ignore?: boolean) {
    return insertAsync(this.baseTable, values, ignore);
  }

  updateAsync(
    values: DynamicObject,
    where: Where | DynamicObject | Array<WhereAdvancedObject>
  ) {
    return updateAsync(this.baseTable, values, where);
  }

  deleteAsync(where: Where | DynamicObject) {
    return deleteAsync(this.baseTable, where);
  }
}
