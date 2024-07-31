export type StripTeam = {
  logo: string;
  abbrev: string;
  score: number;
}

export type StandingsTeam = {
  teamLogo:string;
  teamAbbrev:string;
  teamName:string;
  seed: number;
  totalRecord: Record;
  PF: number;
  PA: number;
  netPoints: number;
  homeRecord: Record;
  awayRecord: Record;
  divRecord: Record;
  streak: number;
  streakType: string;
  lastRecord: Record;
}

export type Division = {
  name: string;
  teams: StandingsTeam[]
}

export type Record = {
  wins: number;
  losses: number;
  draws: number;
}