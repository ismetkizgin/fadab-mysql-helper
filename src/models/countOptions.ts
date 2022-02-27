import { DynamicObject } from './dynamicObject';
import { Where, WhereAdvancedObject } from './where';

export interface CountOptions {
  where?: Where | DynamicObject | Array<WhereAdvancedObject>;
  fields?: Array<string>;
  distinct?: boolean;
}
