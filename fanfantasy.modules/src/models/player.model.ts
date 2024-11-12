
export type Player = {
  playerId:number;
  acquisitionDate:number;
  acquisitionType:string;
  lineupSlotId:number;
  lineupLocked:boolean;
  rosterLocked:boolean;
  tradeLocked:boolean;
  droppable:boolean;
  contractStatus:string;
  periodTeamId:number;
  active:boolean;
  profilePicture:string;
  defaultPositionId:number;
  firstName:string;
  lastName:string;
  fullName:string;
  proTeamId:number;
  injured:boolean;
  injuryStatus:string;
  lastNewsDate:number;
  lastVideoDate:number;
  seasonOutlook:string;
  playerStats:PlayerStats[];
}

export type PlayerStats = {
  averageScore:number;
  totalPeriodScore:number;
  scoreStats:Object;
  periodSeasonId:number;
  scoringPeriodId:number;
  statSourceId:number;
  statSplitTypeId:number;
  stats: Object;
}

export type Position = {
  name: string;
  abbrev: string;
  allowedSlots: number[];
}