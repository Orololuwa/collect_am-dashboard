import { IGetBusiness } from "data/store/models/business";
import { userInstance } from "data/axios-setup";
import { CreateOrUpdateBusinessBody } from "views/pages/business-setup/forms/business-info";
import { v1 } from "data/apis";

class BusinessService {
  async getBusiness(): Promise<{ message: string; data: IGetBusiness }> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await userInstance.get(`api/${v1}/business`);
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async createBusiness(
    body: CreateOrUpdateBusinessBody
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await userInstance.post(`api/${v1}/business`, body);
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async updateBusiness(
    body: CreateOrUpdateBusinessBody
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await userInstance.patch(`api/${v1}/business`, body);
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }
}

export default new BusinessService();
