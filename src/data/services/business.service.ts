import { IGetBusiness } from "data/store/models/business";
import { userInstance } from "data/axios-setup";

class BusinessService {
  async getBusiness(): Promise<{ message: string; data: IGetBusiness }> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await userInstance.get("/business");
        resolve(response.data);
      } catch (error: any) {
        reject(error);
      }
    });
  }
}

export default new BusinessService();
