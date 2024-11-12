<script setup lang="ts">
import DropDown from '@/components/Basic/DropDown.vue';
import FootballLoader from '@/components/Loader/FootballLoader.vue';
import TeamViewHeader from '@/components/Teams/TeamViewHeader.vue';
import TeamViewPlayers from '@/components/Teams/TeamViewPlayers.vue';
import type { LeagueInfo } from '@/models/league.model';
import type { NFLSchedule } from '@/models/nfl-team.model';
import type { Teams, TeamStandings } from '@/models/team.model';
import { getLeagueStatus, getNFLSchedule, getTeamsInfo } from '@/services/fanfantasy.service';
import { useLeagueState, useProTeamStore } from '@/stores/app';
import { generateRandomId } from '@/utils/random';
import { getDivisionSeed, getTeamByTeamId } from '@/utils/teams';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';

  const {setupProTeamsSchedule} = useProTeamStore();

  type Props = {
    teams: Array<TeamStandings>;
    leagueStatus: LeagueInfo|null;
  }

  const props = defineProps<Props>();
  const leagueState = useLeagueState();
  const teamId:Ref<number> = ref(1);
  const selectedSeason:Ref<number> = ref(leagueState.getLeagueState().currentSeason);
  const reacTeams:Ref<Array<TeamStandings>> = ref(props.teams);
  const reacLeagueStatus:Ref<LeagueInfo|null> = ref(props.leagueStatus);
  const selectedWeek:Ref<number> = ref(leagueState.getLeagueState().currentWeek);

  const loadingProSchedule:Ref<boolean> = ref(false);
  const loadingTeamsData:Ref<boolean> = ref(false);
  const loadingLeagueStatus:Ref<boolean> = ref(false);

  const team = computed(() => getTeamByTeamId(reacTeams.value, teamId.value));
  const teamDivisionSeed = computed(() => getDivisionSeed(reacTeams.value, teamId.value));

  const seasonOptions:Ref<Array<number>> = ref(leagueState.getSeasonOptions());
  const weekOptions:Ref<Array<number>> = ref(leagueState.getWeekOptions(selectedSeason.value));

  const changeSeason = async (option:number) => {
    selectedSeason.value = (seasonOptions.value[option])

    loadingProSchedule.value = true;
    loadingTeamsData.value = true;
    loadingLeagueStatus.value = true;

    getNFLSchedule(seasonOptions.value[option])
      .then((response: Array<NFLSchedule>) => {
        setupProTeamsSchedule(response);
      })
      .finally(() => {
        loadingProSchedule.value = false;
      });

    getTeamsInfo(seasonOptions.value[option])
      .then((response: Teams) => {
        reacTeams.value = response.teams;
      })
      .catch((error) => console.log(error))
      .finally(() => {
        loadingTeamsData.value = false;
      })

    getLeagueStatus(seasonOptions.value[option])
      .then((response: LeagueInfo) => {
        reacLeagueStatus.value = response;
      })
      .catch((error) => console.log(error))
      .finally(() => {
        loadingLeagueStatus.value = false;
      })

    weekOptions.value = leagueState.getWeekOptions(seasonOptions.value[option]);
    changeWeek(0);
  }
  
  const changeWeek = (option:number) => {
    selectedWeek.value = (weekOptions.value[option])
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
    <TeamViewPlayers :team="team" :leagueStatus="reacLeagueStatus!" :week="selectedWeek" :season="selectedSeason" />
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
