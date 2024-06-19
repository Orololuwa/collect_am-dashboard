import {
  LoginRequestBody,
  LoginResponseData,
  RegisterBody
} from "data/store/models/auth";
import { AxiosResponse } from "axios";
import { LOGIN, LOGOUT, REGISTER, v1 } from "data/apis";
import { authInstance, userInstance } from "data/axios-setup";

class AuthService {
  async register(
    body: RegisterBody
  ): Promise<AxiosResponse<{ message: string }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await authInstance.post(`api/${v1}/${REGISTER}`, body);
        resolve(response);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async login(
    body: LoginRequestBody
  ): Promise<AxiosResponse<{ data: LoginResponseData; message: string }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await authInstance.post(`api/${v1}/${LOGIN}`, body);
        resolve(response);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  async logout(): Promise<AxiosResponse<LoginResponseData>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await userInstance.post(`api/${v1}/${LOGOUT}`);
        resolve(response);
      } catch (error: any) {
        reject(error);
      }
    });
  }
}

export default new AuthService();
