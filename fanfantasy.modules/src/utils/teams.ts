import type { Division } from "@/models/league.model";
import type { TeamStandings } from "@/models/team.model";

export const getTeamsByDivision = (teams: TeamStandings[], divisionId: number): TeamStandings[] => {
  return teams ? teams.filter(team => team.divisionId === divisionId) : [];
};

export const getDivisionNameById = (divisions: Division[]|undefined, id:number):string => {
  if (divisions === undefined) return "";
  return divisions.filter(div => div.divisionId === id)[0].divisionName;
}

export const getDivisionSeed = (teams: TeamStandings[], teamId: number):number => {
  const team = getTeamByTeamId(teams, teamId);
  if (team === undefined) return 0;
  const teamsInDivision = getTeamsByDivision(teams, team.divisionId).sort((a, b) => a.playoffSeed - b.playoffSeed);
  const teamIndex = teamsInDivision.findIndex(t => t.teamId === teamId)
  return teamIndex !== -1 ? teamIndex + 1 : -1;
}

export const getTeamByTeamId = (teams: TeamStandings[], teamId:number):TeamStandings => {
  return teams.find(t => t.teamId === teamId)!;
}