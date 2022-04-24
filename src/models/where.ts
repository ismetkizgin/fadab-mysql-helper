import { DynamicObject } from './dynamicObject';

export interface Where {
  _and: Where | DynamicObject;
  _or: Where | DynamicObject;
}

export interface WhereAdvancedObject {
  key: string;
  value: any;
  conditionType:
    | 'eq'
    | 'not_eq'
    | 'like'
    | 'in'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'is'
    | 'not_is';
}
