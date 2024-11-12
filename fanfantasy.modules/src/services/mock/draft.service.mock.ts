import type { DraftListInfo } from "@/models/draft-list.model"
import { isAllMocked } from "./general";

const enableLocalMock = false;

export const isMocked = ():boolean => isAllMocked() || enableLocalMock;

export const getDraftListMock = async ():Promise<Array<DraftListInfo>> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return Promise.resolve([
    {
      fullName: "Thiago Carreiro",
      profilePictureUrl: "https://a.espncdn.com/i/headshots/college-football/players/full/4361904.png",
      position: "WR",
      byeWeek: 8,
      teamName: "Green Bay Packers",
      teamAbbrev: "GB",
      teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png",
      rookie: false
    },
    {
      fullName: "Wescley Cordeiro",
      profilePictureUrl: "https://a.espncdn.com/i/headshots/college-football/players/full/4361905.png",
      position: "QB",
      byeWeek: 9,
      teamName: "Green Bay Packers",
      teamAbbrev: "GB",
      teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/no.png",
      rookie: true
    },
    {
      fullName: "Bruno Machado",
      profilePictureUrl: "https://a.espncdn.com/i/headshots/college-football/players/full/4361906.png",
      position: "TE",
      byeWeek: 8,
      teamName: "Green Bay Packers",
      teamAbbrev: "GB",
      teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png",
      rookie: false
    },
    {
      fullName: "Kaio Machado",
      profilePictureUrl: "https://a.espncdn.com/i/headshots/college-football/players/full/4361907.png",
      position: "TE",
      byeWeek: 8,
      teamName: "Chicago Bears",
      teamAbbrev: "CHI",
      teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png",
      rookie: false
    },
    {
      fullName: "João Gondim",
      profilePictureUrl: "https://a.espncdn.com/i/headshots/nfl/players/full/3930086.png",
      position: "WR",
      byeWeek: 11,
      teamName: "Pittsburgh Steelers",
      teamAbbrev: "PIT",
      teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png",
      rookie: false
    },
    {
      fullName: "Mauro Brito",
      profilePictureUrl: "https://a.espncdn.com/i/headshots/nfl/players/full/2991662.png",
      position: "RB",
      byeWeek: 12,
      teamName: "Atlanta Falcons",
      teamAbbrev: "ATL",
      teamLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png",
      rookie: false
    }
  ])
};
