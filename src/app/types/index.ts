export interface IGenericServicePayload<QP, B, PV> {
  queryParams?: Partial<QP>;
  body?: Partial<B>;
  pathVariables?: Partial<PV>;
}

export interface PageQuery {
  page: number;
  pageSize: number;
}
