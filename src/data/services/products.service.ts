import { userInstance } from "data/axios-setup";
import { v1 } from "data/apis";
import { ProductEntity } from "data/store/models/products";
import { IPagination } from "data/store/models/shared";
import { getBusinessId } from "app/utils/business-id.util";
import {
  CreateProductBody,
  GetProductsQueryParams,
  UpdateProductBody
} from "app/types/products";
import { IGenericServicePayload } from "app/types";

class ProductService {
  async getProducts(
    payload: IGenericServicePayload<
      GetProductsQueryParams,
      undefined,
      undefined
    >
  ): Promise<{
    message: string;
    data: ProductEntity[];
    pagination: IPagination;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        const response = await userInstance.get(
          `api/${v1}/${businessId}/product`,
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

  async getProduct(
    payload: IGenericServicePayload<undefined, undefined, { id: number }>
  ): Promise<{
    message: string;
    data: ProductEntity;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        const response = await userInstance.get(
          `api/${v1}/${businessId}/product/${payload.pathVariables?.id}`,
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

  async createProduct(
    payload: IGenericServicePayload<undefined, CreateProductBody, undefined>
  ): Promise<{ message: string; data: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        const response = await userInstance.post(
          `api/${v1}/${businessId}/product`,
          payload.body
        );
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async updateProduct(
    payload: IGenericServicePayload<
      undefined,
      UpdateProductBody,
      { id: number }
    >
  ): Promise<{ message: string; data: null }> {
    return new Promise(async (resolve, reject) => {
      try {
        const { businessId } = getBusinessId();
        if (!payload.pathVariables) throw new Error("missing product id");
        const { id } = payload.pathVariables;
        const response = await userInstance.patch(
          `api/${v1}/${businessId}/product/${id}`,
          payload.body
        );
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }
}

export default new ProductService();
