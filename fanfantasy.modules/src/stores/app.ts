import { defineStore } from 'pinia'
import type { NFLSchedule, NFLTeam } from '@/models/nfl-team.model';
import { getCurrentWeekSummary, getLeagueStatus, getNFLSchedule, getTeamsInfo } from '@/services/fanfantasy.service';
import { getAllProTeams } from '@/services/league-settings.service';

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
  selectedSeason:number;
  selectedWeek:number;
  selectedTeamId: number;
  currentViewIndex:number;
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
    async getProTeamsData() {
      try {
        const response = await getAllProTeams();
        this.setupProTeams(response);
      } catch (error) {
        console.log(error);
      }
    },
    async getProTeamsSchedule(season:number) {
      try {
        const response = await getNFLSchedule(season);
        this.setupProTeamsSchedule(response);
      } catch (error) {
        console.log(error);
      }
    }
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
    previousSeason:[],
    selectedSeason: 0,
    selectedWeek: 0,
    selectedTeamId: 0,
    currentViewIndex:0
  }),
  persist: true,
  actions: {
    setupLeagueState(newState:LeagueState) {
      this.$state = newState
    },
    selectTeam(teamId:number) {
      this.$state.selectedTeamId = teamId;
    },
    setCurrentViewIndex(currentViewIndex:number) {
      this.$state.currentViewIndex = currentViewIndex;
    },
    async getCurrentWeekMatchSummary() {
      try {
        const response = await getCurrentWeekSummary(this.$state.currentSeason, this.$state.currentWeek)
        response.forEach((match)=>{
          if (!match.awayTeam.score) match.awayTeam.score = 0;
          if (!match.homeTeam.score) match.homeTeam.score = 0;
        })
        return response;
      } catch (error) {
        console.log(error)
      }
      return [];
    },
    async getTeamsData() {
      try {
        const response = await getTeamsInfo(this.$state.currentSeason)
        return response.teams;
      } catch (error) {
        console.log(error)
      }
      return [];
    },
    async getLeagueStatusData(season:number) {
      try {
        const response = await getLeagueStatus(season);
        this.setupLeagueState({
          currentWeek: response.status.currentWeek,
          lastWeek: response.status.finalWeek,
          currentSeason: season,
          previousSeason: response.status.previousSeasons,
          selectedSeason: this.currentSeason,
          selectedWeek: this.currentWeek,
          currentViewIndex: 1,
          selectedTeamId: 1,
        });
        return response;
      } catch (error) {
        console.log(error)
      }
      return null;
    }
  },
  getters: {
    getLeagueState: (state: LeagueState) => (): LeagueState => {
      return state;
    },
    // getSeasonOptions: (state: LeagueState) => (): number[] => {
    //   return [state.currentSeason].concat(state.previousSeason.reverse()).filter(season => season >= 2018);
    // },
    // getWeekOptions: (state: LeagueState) => (season:number): number[] => {
    //   if (season === state.currentSeason) return Array(state.currentWeek).fill(0).map((_, index) => index + 1).reverse();
    //   return Array(state.lastWeek).fill(0).map((_, index) => index + 1).reverse();
    // }
  }
});
