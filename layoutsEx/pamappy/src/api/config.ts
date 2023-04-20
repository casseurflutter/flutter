/**
 * You can modify this file
 *
 * @version 5
 */
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
//@ts-ignore
import qs from "qs";

import { loadString } from "../utils/storage";
export const LOCAL_STORAGE_KEY = "API_TOKEN_6";
// export const BASE_URL = "http://localhost:3000";
export const BASE_URL =
  process.env.API_URL ?? "https://staging-pamappy.linksoftware.net";

const baseConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  paramsSerializer: (param) => qs.stringify(param, { indices: false }),
};

let axiosInstance: AxiosInstance;

function getAxiosInstance(security: Security): AxiosInstance {
  if (!axiosInstance) {
    axiosInstance = Axios.create(baseConfig);

    // Response interceptor
    axiosInstance.interceptors.response.use(
      (async (response: AxiosResponse): Promise<SwaggerResponse<any>> => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        /**
         * Example on response manipulation
         *
         * @example
         *   const swaggerResponse: SwaggerResponse = {
         *     ...response,
         *   };
         *   return swaggerResponse;
         */
        return response;
      }) as any,
      (error: AxiosError) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        if (error.response) {
          return Promise.reject(
            new RequestError(
              error.response.data,
              error.response.status,
              error.response
            )
          );
        }

        if (error.isAxiosError) {
          return Promise.reject(new RequestError("noInternetConnection"));
        }
        return Promise.reject(error);
      }
    );
  }

  // ًًRequest interceptor
  axiosInstance.interceptors.request.use(
    async (requestConfig) => {
      // Do something before request is sent
      let accessToken = await loadString(LOCAL_STORAGE_KEY);
      if (accessToken) {
        requestConfig.headers.authorization = "Bearer " + accessToken;
      }

      return requestConfig;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

class RequestError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public response?: AxiosResponse
  ) {
    super(message);
  }

  isApiException = true;
}

export type Security = any[] | undefined;

export interface SwaggerResponse<R> extends AxiosResponse<R> {}

export { getAxiosInstance, RequestError };

export function attachmentFileToURL(id: string | undefined) {
  return `${BASE_URL}/attachment/files/${id}`;
}
