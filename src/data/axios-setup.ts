import axios, { AxiosRequestHeaders } from "axios";
import ExpirySession from "app/utils/expirysession";

// export const API_VERSION = "v1";
export const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
axios.defaults.baseURL = BASE_URL;

//AuthService or Public Calls
export const authInstance = axios.create({
  baseURL: BASE_URL
});

//UserService or Private Calls
export const authHeader = async (headers: AxiosRequestHeaders | undefined) => {
  const accessToken = await ExpirySession.get("access_token");
  return {
    ...headers,
    Authorization: `Bearer ${accessToken}`
  };
};

export const userInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */

userInstance.interceptors.request.use(async (config) => {
  // do something before executing the request
  // For example tag along the bearer access_token token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  // requestConfig.headers = {
  //   ...headers,
  //   Authorization: `Bearer ${Cookies.get("access_token")}`,
  // };
  requestConfig.headers = await authHeader(headers);

  return requestConfig;
});

userInstance.interceptors.response.use(
  (response) => response,
  (error: any) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    // const { response } = error;
    // const originalRequest = error.config;
    // if (response) {
    //   if (response.status === 500) {
    //     // do something here
    //   } else {
    //     return originalRequest;
    //   }
    // }
    return Promise.reject(error);
  }
);
