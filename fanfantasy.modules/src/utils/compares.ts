import type { Record } from "@/models/team.model";

export const compareRecords = (a: Record, b: Record): number => {
  const aTotal:number = a.wins + a.losses;
  const bTotal:number = b.wins + b.losses;

  if (aTotal && bTotal) {
    return b.wins/(bTotal) - a.wins/(aTotal);
  }

  return 0;
};

export const compareStrings = (a: string, b: string): number => {
  return a.localeCompare(b);
}

export const compareNumbers = (a: number, b: number):number => {
  return b - a;
}