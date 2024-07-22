import type { DraftListInfo } from "@/models/draft-list.model"

export const getDraftListMock = ():Promise<Array<DraftListInfo>> => {
  return Promise.resolve([
    {
      fullName: "Thiago Carreiro",
      profilePictureUrl: "https://a.espncdn.com/i/headshots/college-football/players/full/4361904.png",
      position: "WR",
      byeWeek: 8,
      teamName: "Green Bay Packers",
      teamAbbrev: "GB",
      teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png",
      rookie: true
    }
  ])

}