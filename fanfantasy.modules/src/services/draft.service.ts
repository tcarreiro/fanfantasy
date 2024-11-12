import type { DraftListInfo } from "@/models/draft-list.model";
import { getAxios } from "./services.config";
import { getDraftListMock, isMocked } from "./mock/draft.service.mock";

export const getDraftList = (season:number):Promise<Array<DraftListInfo>> => {
  return isMocked() ? getDraftListMock() :
  getAxios().get(`api/v1/draft/create-draft-list`, {
    params: {
      season: season,
      amount: 400
    }
  });
};
