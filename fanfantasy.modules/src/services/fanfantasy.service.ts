import type { DraftListInfo } from "@/models/draft-list.model";
import { isMocked } from "./mock/general";
import { getAxios } from "./services.config";
import { getCurrentMatchsMock, getDraftListMock } from "./mock/fanfantasy.mock";
import type { StripTeam } from "@/models/team.model";

export const getDraftList = (season:number):Promise<Array<DraftListInfo>> => {
  return isMocked() ? getDraftListMock() :
  getAxios().get(`api/v1/fanfantasy/create-draft-list`, {
    params: {
      season: season,
      amount: 400
    }
  });
};

export const getCurrentMatchs = (season:number, week:number):Promise<Array<StripTeam>> => {
  return isMocked() ? getCurrentMatchsMock() :
  getAxios().get(`api/v1/fanfantasy/create-draft-list`, {
    params: {
      season: season,
      week: week
    }
  });
};