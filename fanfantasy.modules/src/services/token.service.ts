import type { KeycloakToken, RefreshTokenResponse } from "@/models/token.model";
import { useApp } from "@/stores/app";
import { JWT_INVERVAL_VALIDATION } from "@/utils/constants";
import { jwtDecode } from "jwt-decode";
import process from "process";
import { isMocked } from "./mock/general";

export const isTokenValid = (token: string) => {
  const decoded = jwtDecode(token);
  if(decoded.exp) {
    const decodedDate = new Date(0);
    decodedDate.setUTCSeconds(decoded.exp - (JWT_INVERVAL_VALIDATION/1000));
    return new Date < decodedDate;
  }
  return false;
}

export const getNewToken = async(): Promise<RefreshTokenResponse> => {
  const {basePath, token} = useApp();

  // if (isMocked()) return Promise.resolve(getNewTokenMock()); // Em caso de mock

  const baseUrl = process.env.NODE_ENV === "developmentAA" ? `https://ENDEREÇO_DO_REFRESH` : basePath;

  try {
    const response = await fetch(`${baseUrl}/api/token/refresh`);
    const jsonResponse = await response.json();
    return Promise.resolve(jsonResponse as RefreshTokenResponse);
  } catch(error) {
    return Promise.reject(error);
  }
};


export const getRealmRoles = (): Array<string>=>{
  const {token} = useApp();
  const decoded = jwtDecode(token);

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