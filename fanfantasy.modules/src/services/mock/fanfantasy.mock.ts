import type { DraftListInfo } from "@/models/draft-list.model"
import type { StripTeam } from "@/models/team.model";

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

export const getCurrentMatchsMock = async ():Promise<Array<StripTeam>> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return Promise.resolve([
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png",
      abbrev: "GB",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png",
      abbrev: "SF",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png",
      abbrev: "NE",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png",
      abbrev: "MIA",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/no.png",
      abbrev: "NO",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/cle.png",
      abbrev: "CLE",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/lv.png",
      abbrev: "LV",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png",
      abbrev: "KC",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png",
      abbrev: "CHI",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png",
      abbrev: "SEA",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png",
      abbrev: "PHI",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png",
      abbrev: "PIT",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png",
      abbrev: "NYJ",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png",
      abbrev: "NYG",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png",
      abbrev: "TEN",
      score: 0.0
    },
    {
      logo: "https://a.espncdn.com/i/teamlogos/nfl/500/jax.png",
      abbrev: "JAX",
      score: 0.0
    }
  ])
};