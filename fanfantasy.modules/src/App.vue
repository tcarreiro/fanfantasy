<script setup lang="ts">
import { RouterView } from 'vue-router'
import MatchStrip from '@/components/MatchStrip/MatchStrip.vue';
import NavBar from '@/components/Navbar/NavBar.vue';
import MainFooter from '@/components/Footer/MainFooter.vue';
import { onMounted, ref, type Ref } from 'vue';
import type { StripMatchSummary, TeamStandings, Teams } from './models/team.model';
import { getLeagueStatus, getTeamsInfo, getNFLSchedule, getCurrentWeekSummary } from './services/fanfantasy.service';
import FanfantasyLoader from '@/components/Loader/FanfantasyLoader.vue';
import type { LeagueInfo } from './models/league.model';
import { useLeagueState, useProTeamStore } from '@/stores/app'
import type { NFLSchedule, NFLTeam } from './models/nfl-team.model';
import { onBeforeMount } from 'vue';
import {getCurrentSeason} from '@/utils/date';
import { getAllProTeams } from './services/league-settings.service';

const proTeamStore = useProTeamStore();
const leagueState = useLeagueState();

const stripInfo: Ref<Array<StripMatchSummary>> = ref([]);
const teamInfo:Ref<Array<TeamStandings>> = ref([]);
const leagueInfo:Ref<LeagueInfo|null> = ref(null);
const selectedSeason: Ref<number> = ref(leagueState.getLeagueState().currentSeason);
const loadingMatchStripData: Ref<boolean> = ref(true);
const loadingTeamsData:Ref<boolean> = ref(true);
const loadingLeagueStatus:Ref<boolean> = ref(true);


const isLoadingAnything = ():boolean => {
  return loadingMatchStripData.value || loadingTeamsData.value || loadingLeagueStatus.value;
}

onBeforeMount(()=>{
  // TODO
  const season:number = getCurrentSeason();
  getLeagueStatus(season)
  .then((response: LeagueInfo) => {
    leagueInfo.value = response;
  })
  .catch((error) => console.log(error))
  .finally(() => {
    loadingLeagueStatus.value = false;
    leagueState.setupLeagueState({
      currentWeek: leagueInfo.value?.status.currentWeek!,
      lastWeek: leagueInfo.value?.status.finalWeek!,
      currentSeason: season,
      previousSeason: leagueInfo.value?.status.previousSeasons!
    });
  })
})

onMounted( async () => {
  getAllProTeams()
    .then((response: Array<NFLTeam>) => {
      proTeamStore.setupProTeams(response);
    })
    .finally(() => {
    });

  getNFLSchedule(selectedSeason.value)
    .then((response: Array<NFLSchedule>) => {
      proTeamStore.setupProTeamsSchedule(response);
    })
    .finally(() => {
    });
  getCurrentWeekSummary(selectedSeason.value, leagueState.currentWeek)
    .then((response: Array<StripMatchSummary>) => {
      stripInfo.value = response;
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loadingMatchStripData.value = false;
    });
  loadingMatchStripData.value = false;
  getTeamsInfo(selectedSeason.value)
    .then((response: Teams) => {
      teamInfo.value = response.teams;
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loadingTeamsData.value = false;
    })
});

</script>

<template>
  <div class="container">
    <FanfantasyLoader v-if="isLoadingAnything()" />
    <MatchStrip v-if="!isLoadingAnything()" :data="stripInfo" />
    <NavBar v-if="!isLoadingAnything()" />
    <div v-if="!isLoadingAnything()" class="main-content">
      <RouterView :teams="teamInfo" :leagueStatus="leagueInfo" />
    </div>
    <MainFooter v-if="!isLoadingAnything()" :teams="teamInfo" :leagueStatus="leagueInfo"/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
}
/* TODO: mediaquery 1300px por causa da tabela */
.main-content {
  display: flex;
  width: 1250px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

</style>
