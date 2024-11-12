import type { PlayerInfo, PlayerStatsResponse } from "@/models/player.model";
import type { Records, StripTeam, Teams, TeamStandings } from "@/models/team.model";
import { isAllMocked } from "./general";
import type { NFLTeam } from "@/models/nfl-team.model";
import { getRandomNumber } from "@/utils/random";
import type { LeagueInfo } from "@/models/league.model";

const enableLocalMock = false;

export const isMocked = ():boolean => isAllMocked() || enableLocalMock;

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
  ]);
};

export const getTeamsInfoMock = async ():Promise<Teams> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return Promise.resolve(null);
}

export const getLeagueInfoMock = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return Promise.resolve("");
}

export const getLeagueStatusMock = async (): Promise<LeagueInfo> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return Promise.resolve(null);
}

export const getPlayerStatsMock = async (): Promise<PlayerStatsResponse> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return Promise.resolve(new null());
}