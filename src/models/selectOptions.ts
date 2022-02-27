import { Where, WhereAdvancedObject } from './where';
import { OrderBy } from './orderBy';
import { DynamicObject } from './dynamicObject';

export interface SelectOptions {
  where?: Where | DynamicObject | Array<WhereAdvancedObject>;
  limit?: number;
  offset?: number;
  fields?: Array<string>;
  orderBy?: OrderBy;
  distinct?: boolean;
}
