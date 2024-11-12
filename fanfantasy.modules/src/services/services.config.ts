import type { Exception, ExceptionResponse } from "@/models/exception.model";
import { useApp } from "@/stores/app"
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { getNewToken, isTokenValid } from "./token.service";
import { useLoggedUser } from "@/stores/user";
import { isRefreshingToken, updateIsRefreshingToken } from "@/utils/token";

export const getAxios = () => {
  const {fanfantasyApiUrl } = useApp();
  const {loggedUser, token} = useLoggedUser();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept-Language": "pt-BR",
  };
  
  if (loggedUser) {
    headers["Authorization"] = `Bearer ${token?.accessToken ?? ""}`;
  }
  
  
  const createdAxios = axios.create({
    baseURL: fanfantasyApiUrl,
    timeout: 60000,
    headers: headers,
    paramsSerializer: (params) => paramSerializer(params),
  });
  
  createdAxios.interceptors.request.use((config)=> {
    config.params = config.params || {};
    // config.params["customerCode"] = customerCode; // Se quiser deixar um param comum
    return config;
  });
  
  if (loggedUser && !isRefreshingToken)
    createdAxios.interceptors.request.use(handleTokenRefresh);
  
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

const handleTokenRefresh = async (request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const {token, setToken, refreshUser, removeUser} = useLoggedUser();
  const currentToken = request.headers?.Authorization;
  if (typeof currentToken === "string") {
    const onlyToken = currentToken.replace("Bearer ", "");

    if (!isTokenValid(onlyToken)) {
      try {
        updateIsRefreshingToken(true);
        const newToken = await getNewToken(token.refreshToken);
        request.headers.Authorization = `Bearer ${newToken.accessToken}`;
        setToken(newToken);
        refreshUser();
      } catch(error) {
        removeUser();
      }
    } else {
      removeUser();
    }
  }
  updateIsRefreshingToken(false);
  return request;
}