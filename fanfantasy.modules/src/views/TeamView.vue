<script setup lang="ts">
import DropDown from '@/components/Basic/DropDown.vue';
import FootballLoader from '@/components/Loader/FootballLoader.vue';
import TeamViewHeader from '@/components/Teams/TeamViewHeader.vue';
import TeamViewPlayers from '@/components/Teams/TeamViewPlayers.vue';
import type { LeagueInfo } from '@/models/league.model';
import type { Teams, TeamStandings } from '@/models/team.model';
import { getLeagueStatus, getTeamsInfo } from '@/services/fanfantasy.service';
import { useLeagueState, useProTeamStore } from '@/stores/app';
import { getSeasonOptions, getWeekOptions } from '@/utils/league-state';
import { generateRandomId } from '@/utils/random';
import { getDivisionSeed, getTeamByTeamId } from '@/utils/teams';
import { storeToRefs } from 'pinia';
import type { Ref } from 'vue';
import { ref, watch } from 'vue';

  type Props = {
    teams: Array<TeamStandings>;
    leagueStatus: LeagueInfo|null;
  }

  const props = defineProps<Props>();

  const leagueState = storeToRefs(useLeagueState());
  const proTeamStore = useProTeamStore();

  const reacTeams:Ref<Array<TeamStandings>> = ref(props.teams);
  const reacLeagueStatus:Ref<LeagueInfo|null> = ref(props.leagueStatus);

  const loadingProSchedule:Ref<boolean> = ref(false);
  const loadingTeamsData:Ref<boolean> = ref(false);
  const loadingLeagueStatus:Ref<boolean> = ref(false);

  const team:Ref<TeamStandings> = ref(getTeamByTeamId(reacTeams.value, leagueState.selectedTeamId.value));
  const teamDivisionSeed:Ref<number> = ref(getDivisionSeed(reacTeams.value, leagueState.selectedTeamId.value));

  const seasonOptions:Ref<Array<number>> = ref(getSeasonOptions());
  const weekOptions:Ref<Array<number>> = ref(getWeekOptions());

  watch(() => leagueState.selectedTeamId.value, (newTeamId) => {
    team.value = getTeamByTeamId(reacTeams.value, newTeamId);
    teamDivisionSeed.value = getDivisionSeed(reacTeams.value, newTeamId);
    updateData(leagueState.selectedSeason.value);
  });

  watch(() => leagueState.selectedSeason.value, (newSeason) => {
    updateSeasonRelatedData(newSeason);
  });

  const updateSeasonRelatedData = async(season:number) => {
    loadingProSchedule.value = true;
    await proTeamStore.getProTeamsSchedule(season);
    loadingProSchedule.value = false;
  }

  const updateData = async (season:number) => {
    loadingTeamsData.value = true;
    loadingLeagueStatus.value = true;

    getTeamsInfo(season)
      .then((response: Teams) => {
        reacTeams.value = response.teams;
      })
      .catch((error) => console.log(error))
      .finally(() => {
        loadingTeamsData.value = false;
      })

    getLeagueStatus(season)
      .then((response: LeagueInfo) => {
        reacLeagueStatus.value = response;
      })
      .catch((error) => console.log(error))
      .finally(() => {
        loadingLeagueStatus.value = false;
      })
  }

  const changeSeason = async (option:number) => {
    leagueState.selectedSeason.value = (seasonOptions.value[option])
    updateSeasonRelatedData(seasonOptions.value[option]);
    updateData(seasonOptions.value[option]);
    weekOptions.value = getWeekOptions();
    changeWeek(0);
  }
  
  const changeWeek = (option:number) => {
    leagueState.selectedWeek.value = (weekOptions.value[option])
  }

  const isLoadingAnything = ():boolean => {
    return loadingTeamsData.value || loadingLeagueStatus.value || loadingProSchedule.value;
  }

</script>

<template>
  <div class="main-view-header mt-4">
    <h2><span>{{$t('TEAMS.HEADER')}}</span></h2>
  </div>
  <div class="standings-filter mt-2">
    <DropDown :id="generateRandomId()" label="Ano" :options="seasonOptions" @change-selection="changeSeason"/>
    <DropDown :id="generateRandomId()" class="ml-1" label="Semana" :options="weekOptions"  @change-selection="changeWeek" />
  </div>
  <FootballLoader v-if="isLoadingAnything()" />
  <div v-else class="main-view-container" >
    <TeamViewHeader :team="team" :leagueStatus="reacLeagueStatus!" :divisionSeed="teamDivisionSeed" />
    <TeamViewPlayers :team="team" :leagueStatus="reacLeagueStatus!" :week="leagueState.selectedWeek.value" :season="leagueState.selectedSeason.value" />
  </div>

</template>

<style scoped lang="scss">

  .main-view-container {
    width: 100%;
  }

  .standings-filter {
    display: flex;
    text-align: left;
    width: 100%;
  }
</style>
