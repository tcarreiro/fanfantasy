import type { Record } from "@/models/team.model";

export const getPctFromRecord = (record: Record):string => {
  const totalGames:number = record.wins + record.losses;
  if (totalGames === 0) return "0.000";
  return (record.wins / totalGames).toFixed(3);
}

export const getRecordString = (record: Record):string => {
  return `${record.wins}-${record.losses}-${record.ties}`;
}