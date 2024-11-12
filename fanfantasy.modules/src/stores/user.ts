import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { NFLSchedule, NFLTeam } from '@/models/nfl-team.model';
import type { KeycloakToken, TokenResponse } from '@/models/token.model';
import { jwtDecode } from 'jwt-decode';
import { login, logout } from '@/services/token.service';

export type LoggedUser = {
  principle:string;
  username: string;
  loggedUser: boolean;
  token: TokenResponse;
}

export const useLoggedUser = defineStore('fanfantasy-module-user-state', {
  state: (): LoggedUser => ({
    principle: "",
    username: "",
    loggedUser: false,
    token: {
      accessToken: "",
      expiresIn: -1,
      refreshExpiresIn: -1,
      notBeforePolicy: null,
      refreshToken: "",
      scope: "",
      sessionState: "",
      tokenType: ""
    },
  }),
  persist: true,
  actions: {
    async setupLogin(username: string, password: string) {
      try {
        const token = await login(username, password)
        const decoded = jwtDecode(token.accessToken) as KeycloakToken;
        if(decoded.preferred_username) {
            this.$state.principle=decoded.name;
            this.$state.username= decoded.preferred_username;
            this.$state.loggedUser= true;
        }
        this.setToken(token);
      } catch (e) {
        console.log(e);
      }
    },
    async setupLogout() {
      try {
        await logout(this.token.refreshToken)
        this.removeUser();
      } catch (e) {
        console.log(e);
      }
    },
    setupUser(newState:LoggedUser) {
      this.$state = newState ?? "";
    },
    refreshUser() {
      this.$state.loggedUser = true;
    },
    removeUser() {
      this.$state.principle = "";
      this.$state.username = "";
      this.$state.loggedUser = false;
      this.clearToken();
    },
    setToken(token:TokenResponse) {
      if (token) {
        this.$state.token = token;
      }
    },
    clearToken() {
      this.$state.token= {
        accessToken: "",
        expiresIn: -1,
        refreshExpiresIn: -1,
        notBeforePolicy: null,
        refreshToken: "",
        scope: "",
        sessionState: "",
        tokenType: ""
      }
    }
  },
  getters:{
    
  }
})