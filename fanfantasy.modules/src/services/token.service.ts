import type { KeycloakToken, TokenResponse } from "@/models/token.model";
import { useApp } from "@/stores/app";
import { JWT_INVERVAL_VALIDATION } from "@/utils/constants";
import { jwtDecode } from "jwt-decode";
import { getAxios } from "./services.config";
import { useLoggedUser } from "@/stores/user";

export const isTokenValid = (token: string) => {
  const decoded = jwtDecode(token);
  if(decoded.exp) {
    const decodedDate = new Date(0);
    decodedDate.setUTCSeconds(decoded.exp - (JWT_INVERVAL_VALIDATION/1000));
    return new Date < decodedDate;
  }
  return false;
}

export const login = async(username: string, password: string): Promise<TokenResponse> => {
  try {
    return getAxios().post(`/api/v1/auth/login`, {username: username, password: password});
  } catch(error) {
    return Promise.reject(error);
  }
}

export const getNewToken = async(refresh_token: string): Promise<TokenResponse> => {

  try {
    return getAxios().post(`/api/v1/auth/refresh`, {refresh_token:refresh_token});
  } catch(error) {
    return Promise.reject(error);
  }
};

export const logout = async(refresh_token: string): Promise<void> => {

  try {
    return getAxios().post(`/api/v1/auth/logout`, {refresh_token:refresh_token});
  } catch(error) {
    return Promise.reject(error);
  }
}

export const getRealmRoles = (): Array<string>=>{
  const {token} = useLoggedUser();
  if (!token) return [];

  const decoded = jwtDecode(token.accessToken);

  if (decoded) {
    const appToken = decoded as unknown as KeycloakToken;
    if (appToken.realm_access) {
      const roles = appToken.realm_access.roles ??[];
      return roles;
    }
  }
  return [];
}

export const hasAnyRole = (roleToFind: string): boolean => {
  return getRealmRoles().findIndex(role=>role===roleToFind) !== -1;
}