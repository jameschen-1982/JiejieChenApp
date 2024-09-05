export interface TableModel<T> {
  pageIndex: number;
  totalPageCount: number;
  data: T[];
}
