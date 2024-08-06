import { userInstance } from "data/axios-setup";
import { v1 } from "data/apis";
import { IPagination } from "data/store/models/shared";
import { getBusinessId } from "app/utils/business-id.util";
import { IGenericServicePayload } from "app/types";
import { CustomerEntity } from "data/store/models/customers";
import {
  CreateCustomerBody,
  GetCustomerQueryParams,
  UpdateCustomerBody
} from "app/types/customer";

class CustomerService {
  async getCustomers(
    payload: IGenericServicePayload<
      GetCustomerQueryParams,
      undefined,
      undefined
    >
  ): Promise<{
    message: string;
    data: CustomerEntity[];
    pagination: IPagination;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        const response = await userInstance.get(
          `api/${v1}/${businessId}/customer`,
          {
            params: payload.queryParams
          }
        );
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async getCustomer(
    payload: IGenericServicePayload<undefined, undefined, { id: number }>
  ): Promise<{
    message: string;
    data: CustomerEntity;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        const response = await userInstance.get(
          `api/${v1}/${businessId}/customer/${payload.pathVariables?.id}`,
          {
            params: payload.queryParams
          }
        );
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async addCustomer(
    payload: IGenericServicePayload<undefined, CreateCustomerBody, undefined>
  ): Promise<{ message: string; data: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        const response = await userInstance.post(
          `api/${v1}/${businessId}/customer`,
          payload.body
        );
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async updateCustomer(
    payload: IGenericServicePayload<
      undefined,
      UpdateCustomerBody,
      { id: number }
    >
  ): Promise<{ message: string; data: null }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        if (!payload.pathVariables) throw new Error("missing product id");
        const { id } = payload.pathVariables;
        const response = await userInstance.patch(
          `api/${v1}/${businessId}/customer/${id}`,
          payload.body
        );
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }
}

export default new CustomerService();
