export interface IPagination {
  hasPrev: boolean;
  prevPage: number;
  hasNext: boolean;
  nextPage: number;
  currPage: number;
  pageSize: number;
  lastPage: number;
  total: number;
}
