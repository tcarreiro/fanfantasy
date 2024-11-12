import type { StripTeam, TeamStandings } from "@/models/team.model";
import fanfantasyLogo from '@/assets/img/league/fanfantasy.svg';

export const logoImg = (fallbackImages:any, team: StripTeam|TeamStandings) => {
  const {teamKey, logoKey} = keySelector(team);
  return fallbackImages.value[teamKey] ? fanfantasyLogo : logoKey;
};

export const onImageError = (fallbackImages:any, team: StripTeam|TeamStandings) => {
  const {teamKey} = keySelector(team);
  fallbackImages.value = {
    ...fallbackImages.value,
    [teamKey]: true
  };
};

const keySelector = (team: StripTeam|TeamStandings) => {
  let teamKey;
  let logoKey;
  if (team) {
    if ('abbrev' in team) {
      teamKey = team.abbrev;
      logoKey = team.logo;
    } else if ('teamAbbreviation' in team) {
      teamKey = team.teamName;
      logoKey = team.logoUrl;
    }
  }
  return {teamKey, logoKey};
}