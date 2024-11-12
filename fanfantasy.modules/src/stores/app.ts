import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { NFLSchedule, NFLTeam } from '@/models/nfl-team.model';
import type { KeycloakToken, TokenResponse } from '@/models/token.model';
import { jwtDecode } from 'jwt-decode';
import { login } from '@/services/token.service';
import { decode } from 'punycode';

export type Envs = 'dev'|'local'|'prod';

export type AppState = {
  basePath:string;
  fanfantasyApiUrl: string;
  enviroment: Envs;
}

export type CacheData = {
  proTeams: NFLTeam[];
  proSchedule: NFLSchedule[];
}

export type LeagueState = {
  currentWeek: number;
  lastWeek: number;
  currentSeason: number;
  previousSeason: number[];
}

export const useApp = defineStore('fanfantasy-module-app-state', {
  state: (): AppState => ({
    basePath: "",
    fanfantasyApiUrl: "http://localhost:8081",
    enviroment: "local"
  }),
  persist: true,
  actions: {
    setupApp(newState:AppState) {
      this.$state = newState ?? this.basePath
    }
  },
  getters:{
    
  }
})

export const useProTeamStore = defineStore('nfl-pro-settings', {
  state: (): CacheData => ({
    proTeams: [],
    proSchedule: []
  }),
  persist: true,
  actions: {
    setupProTeams(newState:NFLTeam[]) {
      this.$state.proTeams = newState
    },
    setupProTeamsSchedule(newState:NFLSchedule[]) {
      this.$state.proSchedule = newState;
    },
  },
  getters: {
    getProTeamById: (state: CacheData) => (proTeamId: number): NFLTeam | undefined => {
      return state.proTeams.find(t => t.espnTeamId === proTeamId);
    },
    getNFLMatchByTeamId: (state: CacheData) => (proTeamId: number): NFLSchedule[] => {
      return state.proSchedule.filter(m => m.awayTeamId === proTeamId || m.homeTeamId === proTeamId);
    },
    getNFLMatchByWeek: (state: CacheData) => (week: number): NFLSchedule[] => {
      return state.proSchedule.filter(m => m.week === week);
    },
  }
});

export const useLeagueState = defineStore('league-state', {
  state: (): LeagueState => ({
    lastWeek: 0,
    currentWeek: 0,
    currentSeason: 0,
    previousSeason:[]
  }),
  persist: true,
  actions: {
    setupLeagueState(newState:LeagueState) {
      this.$state = newState
    }
  },
  getters: {
    getLeagueState: (state: LeagueState) => (): LeagueState => {
      return state;
    },
    getSeasonOptions: (state: LeagueState) => (): number[] => {
      return [state.currentSeason].concat(state.previousSeason.reverse()).filter(season => season >= 2018);
    },
    getWeekOptions: (state: LeagueState) => (season:number): number[] => {
      if (season === state.currentSeason) return Array(state.currentWeek).fill(0).map((_, index) => index + 1).reverse();
      return Array(state.lastWeek).fill(0).map((_, index) => index + 1).reverse();
    }
  }
});
