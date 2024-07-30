export type StripTeam = {
  logo: string;
  abbrev: string;
  score: number;
}

export type StandingsTeam = {
  teamLogo:string;
  teamAbbrev:string;
  teamName:string;
  wins: number;
  losses: number;
  draws: number;
  totalPct: number;
  PF: number;
  PA: number;
  netPoints: number;
  homeRecord: string;
  awayRecord: string;
  divRecord: string;
  divPct: number;
  streak: number;
  streakType: string;
  lastRecord: string;
}

export type Division = {
  name: string;
  teams: StandingsTeam[]
}