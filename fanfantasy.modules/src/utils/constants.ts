import type { Player } from "@/models/player.model";

export const REPOSITORY_NAME = 'fanfantasy';

export const JWT_INVERVAL_VALIDATION = 30000;

export const COLOR_PER_POSITION = {
  QB: '#880000',
  RB: '#008800',
  WR: '#000088',
  TE: '#FF00FF',
  DST: '#330033'
}

export const STANDINGS_MODE_DIVISION = 0;

export const STANDINGS_MODE_LEAGUE = 1;

export const TABLE_SORTING_ASCENDING = -1;

export const TABLE_SORTING_DESCENDING = 1;

export const PLAYER_STATUS = {
  READY: "ready",
  PLAYED: "played",
  BYE: "bye",
  INJURY: "injury",
  IR: "ir"
}

export const ROSTER_SLOT_ID = {
  0: "QB",
  2: "RB",
  4: "WR",
  6: "TE",
  16: "D/ST",
  20: "Bench",
  21: "IR",
  23: "FLEX"
};

export const POSITION_ID = {
  1: "QB",
  2: "RB",
  3: "WR",
  4: "TE",
  16: "D/ST"
}

export const PLAYER_PROFILE_PIC_URL = "https://a.espncdn.com/i/headshots/nfl/players/full/%s.png";
export const PLAYER_PROFILE_ROOKIE_URL = "https://a.espncdn.com/i/headshots/college-football/players/full/%s.png";

export const EMPTY_PLAYER:Player = {
  playerId:-1,
  acquisitionDate:-1,
  acquisitionType:"",
  lineupSlotId:0,
  lineupLocked:false,
  rosterLocked:false,
  tradeLocked:false,
  droppable:false,
  contractStatus:"",
  periodTeamId:-1,
  active:false,
  profilePicture:"",
  defaultPositionId:-1,
  firstName:"Empty",
  lastName:"",
  fullName:"Empty",
  proTeamId:0,
  injured:false,
  injuryStatus:"",
  lastNewsDate:-1,
  lastVideoDate:-1,
  seasonOutlook:"",
  playerStats:[]
}

export enum MatchupWinnerTag {
  HOME = "HOME",
  AWAY = "AWAY",
  UNDECIDED = "UNDECIDED"
}