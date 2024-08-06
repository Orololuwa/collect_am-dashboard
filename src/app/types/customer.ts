export interface GetCustomerQueryParams {
  page: number;
  pageSize: number;
  email: string;
}

export interface CreateCustomerBody {
  type: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone: string;
  unitNumber: string;
  addressLine: string;
  city: string;
  state: string;
  countryCode: string;
  postalCode: string;
  addressLineI: string;
  addressLineII: string;
}

export type UpdateCustomerBody = Partial<
  Pick<CreateCustomerBody, "firstName" | "lastName" | "name" | "type">
>;
