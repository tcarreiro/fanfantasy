<script setup lang="ts">
import { RouterView } from 'vue-router'
import MatchStrip from '@/components/MatchStrip/MatchStrip.vue';
import NavBar from '@/components/Navbar/NavBar.vue';
import MainFooter from '@/components/Footer/MainFooter.vue';
import { onMounted, ref, type Ref } from 'vue';
import type { StripMatchSummary, TeamStandings } from './models/team.model';
import FanfantasyLoader from '@/components/Loader/FanfantasyLoader.vue';
import type { LeagueInfo } from './models/league.model';
import { useLeagueState, useProTeamStore } from '@/stores/app'
import { onBeforeMount } from 'vue';
import {getCurrentSeason} from '@/utils/date';

const proTeamStore = useProTeamStore();
const leagueState = useLeagueState();

const stripInfo: Ref<Array<StripMatchSummary>> = ref([]);
const teamInfo:Ref<Array<TeamStandings>> = ref([]);
const leagueInfo:Ref<LeagueInfo|null> = ref(null);
const loadingMatchStripData: Ref<boolean> = ref(true);
const loadingTeamsData:Ref<boolean> = ref(true);
const loadingLeagueStatus:Ref<boolean> = ref(true);

const isLoadingAnything = ():boolean => {
  return loadingMatchStripData.value || loadingTeamsData.value || loadingLeagueStatus.value;
}

onBeforeMount(async ()=>{
  leagueInfo.value = await leagueState.getLeagueStatusData(getCurrentSeason());
  loadingLeagueStatus.value = false;
})

onMounted( async () => {
  proTeamStore.getProTeamsData();
  proTeamStore.getProTeamsSchedule(leagueState.currentSeason);
  stripInfo.value = await leagueState.getCurrentWeekMatchSummary();
  loadingMatchStripData.value = false;
  teamInfo.value = await leagueState.getTeamsData();
  loadingTeamsData.value = false;
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
