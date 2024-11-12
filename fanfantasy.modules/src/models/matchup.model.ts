export type TeamMatchSummary = {
  teamId:number;
  tiebreak:number;
  totalPoints:number;
}

export type MatchSummary = {
  homeTeam:TeamMatchSummary;
  awayTeam:TeamMatchSummary;
  matchId:number;
  winner:string;
}

export type WeekMatchup = {
  schedule: MatchSummary
}