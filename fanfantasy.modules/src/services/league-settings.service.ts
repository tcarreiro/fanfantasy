import { getAxios } from "./services.config";
import type { NFLTeam } from "@/models/nfl-team.model";

export const getProTeamsById = (proTeamId:number):Promise<Array<NFLTeam>> => {
  return getAxios().get(`api/v1/settings/nfl-teams`, {
    params: {
      proTeamId: proTeamId,
    }
  });
};

export const getAllProTeams = ():Promise<Array<NFLTeam>> => {
  return getAxios().get(`api/v1/settings/nfl-teams`);
};
