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

export const initPaginationState = {
  hasPrev: false,
  prevPage: 0,
  hasNext: false,
  nextPage: 2,
  currPage: 1,
  pageSize: 10,
  lastPage: 1,
  total: 10
};
