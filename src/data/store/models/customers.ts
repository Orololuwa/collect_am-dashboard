export interface CustomerEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  code: string;
  status: string;
  businessId: number;
  type: NonNullable<"individual" | "corporate" | undefined>;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  address: AddressEntity;
}

export interface AddressEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  unitNumber: string;
  addressLine: string;
  city: string;
  state: string;
  countryCode: string;
  postalCode: string;
  addressLineI: string;
  addressLineII: string;
}
