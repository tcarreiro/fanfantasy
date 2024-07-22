import type { DraftListInfo } from "@/models/draft-list.model";
import { isMocked } from "./mock/general";
import { getAxios } from "./services.config";
import { getDraftListMock } from "./mock/fanfantasy.mock";

export const getDraftList = (season:number):Promise<Array<DraftListInfo>> => {
  return isMocked() ? getDraftListMock() :
    getAxios().get(`api/v1/fanfantasy/create-draft-list`, {
      params: {
        season: season,
        amount: 400
      }
    });

}