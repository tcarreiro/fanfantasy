<script setup lang="ts">
import type { TeamStandings } from '@/models/team.model';
import { ref } from 'vue';
import {getTeamsByDivision} from '@/utils/teams';
import type { Division } from '@/models/league.model';
import fanfantasyLogo from '@/assets/img/league/fanfantasy.svg';
import { useLeagueState } from '@/stores/app';
import { changeTab, getTeamPageView } from '@/utils/route';

type Props = {
  teams: Array<TeamStandings>;
  division: Division;
}

const props = defineProps<Props>();

const leagueState = useLeagueState();

const fallbackImages = ref({});

const logoImg = (team: TeamStandings) => {
  return fallbackImages.value[team.teamName] ? fanfantasyLogo : team.logoUrl
};

const onImageError = (team: TeamStandings) => {
  fallbackImages.value = {
    ...fallbackImages.value,
    [team.teamName]: true
  };
};

</script>

<template>
  <div class="col-2 footer-content-column">
    <div class="footer-column-header mb-1">{{ props.division.divisionName }}</div>
    <div class="footer-team-logo-container" v-for="(team, teamIndex) in getTeamsByDivision(props.teams, props.division.divisionId)" :key="teamIndex">
      <RouterLink :to="getTeamPageView.path" @click="leagueState.currentViewIndex = changeTab(getTeamPageView.index)">
        <img :src="logoImg(team)"  alt="" class="footer-team-logo mt-2" @error="onImageError(team)" @click="()=>{leagueState.selectTeam(team.teamId)}">
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss">
  .footer-content {
    display: flex;
    justify-content: space-between;
    margin: 0 25%;

    .footer-content-column {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .footer-team-logo-container {
        width: 100%;
        display: flex;
        justify-content: center;
        cursor: pointer;
      }
      
      .footer-team-logo {
        width: 75px;
        height: 75px;
        object-fit: cover;
        border-radius: 25%;
      }

      .footer-column-header {
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
      }
    }
  }

</style>