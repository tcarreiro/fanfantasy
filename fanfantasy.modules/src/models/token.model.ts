export type RefreshTokenResponse = {
  valid: boolean,
  expiredAt: Date,
  auth_time: Date,
  refresh_token_valid: boolean,
  session_expiredAt: Date,
  refresh_token_expiredAt: Date,
  token: string,
}

export type Roles = {
  roles: Array<string>
}

export type KeycloakToken = {
  exp: number,
  iat: number,
  auth_time: number,
  jti: string,
  iss: string,
  aud: Array<String>,
  sub: string,
  typ: string,
  azp: string,
  nonce: string,
  session_state: string,
  realm_access: Roles,
  resource_access: {
    realManagement: Roles,
    broker: Roles,
    account: Roles
  },
  scope: string,
  sid: string,
  email_verified: boolean,
  name: string,
  preferred_name: string,
  given_name: string,
  family_name: string,
  email: string
}