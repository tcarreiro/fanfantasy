export type LeagueInfo = {
  name: string;
  firstSeason: number;
  status: LeagueStatus;
  settings: LeagueSettings;
}

export type LeagueStatus = {
  currentWeek: number;
  finalWeek: number;
  lastScoringWeek: number;
  previousSeasons: number[];
}

export type LeagueSettings = {
  scheduleSettings: Divisions;
  rosterSettings: RosterSlots;
}

export type Divisions = {
  divisions: Division[];
}

export type Division = {
  divisionId: number;
  divisionName: string;
}

export type RosterSlots = {
  season:number;
  slotIdList:number[];
}