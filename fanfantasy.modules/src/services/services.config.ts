import type { Exception, ExceptionResponse } from "@/models/exception.model";
import { useApp } from "@/stores/app"
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

export const getAxios = () => {
  const {fanfantasyApiUrl, token} = useApp();

  const createdAxios = axios.create({
    baseURL: fanfantasyApiUrl,
    timeout: 60000,
    headers: {
      "Content-Type": "application/json",
      // credentials: "include",
      // "Accept-Language": "pt-BR",
      // Authorization: `Bearer ${token}`
    }
  });

  createdAxios.interceptors.request.use((config)=> {
    config.params = config.params || {};
    // config.params["customerCode"] = customerCode; // Se quiser deixar um param comum
    return config;
  });

  // createdAxios.interceptors.request.use(handleTokenRefresh);

  createdAxios.interceptors.response.use(getAxiosResponse, handleException);

    return createdAxios;

};

export const getAxiosResponse = (response: AxiosResponse) => {
  return response.data;
}

export const handleException = (error: AxiosError): Promise<Exception> => {
  if (error.response) {
    const {code, message} = error?.response?.data as ExceptionResponse;

    const exception: Exception = {
      code: code ?? "unknown-error",
      message: message ?? "",
      i18nTag: code ? `EXCEPTIONS.${code}` : `EXCEPTIONS.UNKNOWN_ERROR`,
      originalError: error,
      httpStatus: error.status ?? 0
    };

    return Promise.reject(exception);
  }

  return Promise.reject(error);
};

export const paramSerializer = (params: any) => {
  return Object.keys(params)
    .filter((key) => params[key] !== null)
    .map((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        return value
          .map((val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join("&");
};

// const handleTokenRefresh = async (request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
//   const {setToken} = useApp();
//   const currentToken = request.headers?.Authorization;
//   if (typeof currentToken === "string") {
//     const onlyToken = currentToken.replace("Bearer ", "");

//     if (!isTokenValid(onlyToken)) {
//       try {
//         const newToken = await getNewToken();
//         request.headers.Authorization = `Bearer ${newToken}`;
//         setToken(newToken.token);
//       } catch(error) {
//         return Promise.reject();
//       }
//     }
//   }
//   return request;
// }