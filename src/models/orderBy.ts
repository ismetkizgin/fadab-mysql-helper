export interface OrderBy {
  ranking: 'ASC' | 'DESC';
  fields: string | Array<string>;
}
