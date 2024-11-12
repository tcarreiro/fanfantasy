export type StripTeam = {
  logo: string;
  abbrev: string;
  score: number;
}

export type StripMatchSummary = {
  homeTeam:StripTeam;
  awayTeam:StripTeam;
  matchId:number;
  winner:string;
  started:boolean;
}

export type Teams = {
  teams: TeamStandings[]
}

export type TeamStandings = {
  teamId: number;
  teamAbbreviation:string;
  teamName:string;
  divisionId: number;
  currentProjectedRank: number;
  draftDayProjectedRank: number;
  logoType:string;
  logoUrl:string;
  playoffSeed: number;
  pointsFor: number;
  finalPosition: number;
  record: Records;
  manager: string;
  acquisitionBudgetSpent: Acquisition;
  // TODO
  // last5: Record;
}

export type Acquisition = {
  budgetSpent: number;
  acquisitions: number;
  drops: number;
  moveToActive: number;
  moveToIR: number;
}

export type Standings = {
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

export type Record = {
  losses: number;
  ties: number;
  wins: number;
  percentage: number;
  pointsAgainst: number;
  pointsFor: number;
  streakLength: number;
  streakType: string;
}

export type Records = {
  overall: Record;
  home: Record;
  away: Record;
  division: Record;
}