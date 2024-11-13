import { useLeagueState } from "@/stores/app";

export const getSeasonOptions = ():number[] => {
  const state = useLeagueState();
  return [state.currentSeason].concat(state.previousSeason.reverse()).filter(season => season >= 2018);
}

export const getWeekOptions = ():number[] => {
  const state = useLeagueState();
  if (state.selectedSeason === state.currentSeason) return Array(state.currentWeek).fill(0).map((_, index) => index + 1).reverse();
  return Array(state.lastWeek).fill(0).map((_, index) => index + 1).reverse();
}