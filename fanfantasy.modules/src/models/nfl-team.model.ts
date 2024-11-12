
export type NFLTeam = {
  logoUrl: string;
  teamAbbrev: string;
  teamName: string;
  espnTeamId: number;
}

export type NFLSchedule = {
  awayTeamId: number;
  homeTeamId: number;
  date: number;
  matchId:number;
  week:number;
  startTimeTBD:boolean;
  statsOfficial:boolean;
  validForLocking:boolean;
}

export type NFLMatch = {
  homeTeam: NFLTeam;
  roadTeam: NFLTeam;
  week: number;
  date: NFLDate;
  homeScore: number;
  roadScore: number;
  winner: string;
}

export type NFLDate = {
  day: number;
  month: number;
  year: number;
  hour: string;
}