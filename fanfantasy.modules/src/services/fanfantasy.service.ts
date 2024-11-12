import { getAxios } from "./services.config";
import { getCurrentMatchsMock, getLeagueInfoMock, getLeagueStatusMock, getPlayerStatsMock, getTeamsInfoMock, isMocked } from "./mock/fanfantasy.service.mock";
import type { StripMatchSummary, StripTeam, Teams } from "@/models/team.model";
import type { LeagueInfo } from "@/models/league.model";
import type { Player } from "@/models/player.model";
import type { NFLSchedule } from "@/models/nfl-team.model";
import type { TeamMatchSummary } from "@/models/matchup.model";

export const getCurrentMatchs = (season:number, weeks:number[]):Promise<TeamMatchSummary> => {
  return getAxios().get(`api/v1/fanfantasy/matchInfo`, {
    params: {
      leagueId:270838,
      season: season,
      weeks: weeks
    }
  });
};

export const getCurrentWeekSummary = (season:number, week:number):Promise<Array<StripMatchSummary>> => {
  return getAxios().get(`api/v1/fanfantasy/weekSummary`, {
    params: {
      leagueId:270838,
      season: season,
      week: week
    }
  });
};

export const getTeamsInfo = (season:number):Promise<Teams> => {
  return isMocked() ? getTeamsInfoMock() :
  getAxios().get(`api/v1/fanfantasy/leagueInfo/standings`, {
    params: {
      leagueId:270838,
      season: season,
    }
  });
};

export const getLeagueInfo = (season:number):Promise<string> => {
  return isMocked() ? getLeagueInfoMock() :
  getAxios().get(`api/v1/fanfantasy/leagueInfo`, {
    params: {
      leagueId:270838,
      season: season,
    }
  });
};

export const getLeagueStatus = (season:number):Promise<LeagueInfo> => {
  return isMocked() ? getLeagueStatusMock() :
  getAxios().get(`api/v1/fanfantasy/leagueInfo/settings`, {
    params: {
      leagueId:270838,
      season: season,
    }
  });
};

export const getPlayerStats = (season:number, week:number, teamId?:number, playerId?:number):Promise<Array<Player>> => {
  return isMocked() ? getPlayerStatsMock() :
  getAxios().get(`api/v1/fanfantasy/matchInfo/players`, {
    params: {
      leagueId:270838,
      season: season,
      week:week,
      teamId:teamId??-1,
      playerId:playerId??-1,
    }
  });
};

export const getNFLSchedule = (season:number):Promise<Array<NFLSchedule>> => {
  return getAxios().get(`api/v1/fanfantasy/nfl-info/pro-schedule`, {
    params: {
      season: season
    }
  });
};