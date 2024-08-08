import { userInstance } from "data/axios-setup";
import { v1 } from "data/apis";
import { IPagination } from "data/store/models/shared";
import { getBusinessId } from "app/utils/business-id.util";
import { IGenericServicePayload } from "app/types";
import { InvoiceEntity } from "data/store/models/invoice";
import { GetInvoicesQueryParams } from "app/types/invoice";

class InvoiceService {
  async getInvoices(
    payload: IGenericServicePayload<
      GetInvoicesQueryParams,
      undefined,
      undefined
    >
  ): Promise<{
    message: string;
    data: InvoiceEntity[];
    pagination: IPagination;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        const response = await userInstance.get(
          `api/${v1}/${businessId}/invoice`,
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

  async getInvoice(
    payload: IGenericServicePayload<undefined, undefined, { id: number }>
  ): Promise<{
    message: string;
    data: InvoiceEntity;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        const response = await userInstance.get(
          `api/${v1}/${businessId}/invoice/${payload.pathVariables?.id}`,
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

  async createInvoice(
    payload: IGenericServicePayload<undefined, unknown, undefined>
  ): Promise<{ message: string; data: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        const response = await userInstance.post(
          `api/${v1}/${businessId}/invoice`,
          payload.body
        );
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async editInvoice(
    payload: IGenericServicePayload<undefined, unknown, { id: number }>
  ): Promise<{ message: string; data: null }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        if (!payload.pathVariables) throw new Error("missing product id");
        const { id } = payload.pathVariables;
        const response = await userInstance.patch(
          `api/${v1}/${businessId}/invoice/${id}`,
          payload.body
        );
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }
}

export default new InvoiceService();
