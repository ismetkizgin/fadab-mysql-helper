import { OrderBy } from './orderBy';

export interface SelectOptions {
  where?: object;
  limit?: number;
  offset?: number;
  fields?: Array<string>;
  orderBy?: OrderBy;
  distinct?: boolean;
}
