<script setup lang="ts">
  import DropDown from '@/components/Basic/DropDown.vue';
  import StandingsTable from '@/components/Standings/StandingsTable.vue';
  import StandingsLegend from '@/components/Standings/StandingsLegend.vue';
  import type { Teams, TeamStandings } from '@/models/team.model';
  import type { Ref } from 'vue';
  import { ref } from 'vue';
  import { STANDINGS_MODE_DIVISION, STANDINGS_MODE_LEAGUE} from '@/utils/constants';
  import { generateRandomId } from '@/utils/random';
  import { getTeamsByDivision } from '@/utils/teams';
  import FootballLoader from '@/components/Loader/FootballLoader.vue';
import type { LeagueInfo } from '@/models/league.model';
import { useLeagueState, useProTeamStore } from '@/stores/app';
import { getLeagueStatus, getTeamsInfo } from '@/services/fanfantasy.service';

  type Props = {
    teams: Array<TeamStandings>;
    leagueStatus: LeagueInfo|null;
  }

  const props = defineProps<Props>();
  const leagueState = useLeagueState();
  const leagueStage:Ref<number> = ref(0);
  const standingsMode:Ref<number> = ref(STANDINGS_MODE_DIVISION);
  const selectedSeason:Ref<number> = ref(2024);
  const teams:Ref<Array<TeamStandings>> = ref(props.teams);
  const leagueStatus:Ref<LeagueInfo|null> = ref(props.leagueStatus);
  const loadingTeamsData:Ref<boolean> = ref(false);
  const loadingLeagueStatus:Ref<boolean> = ref(false);


  const seasonOptions:Ref<Array<number>> = ref(leagueState.getSeasonOptions());
  const stageOptions:Ref<Array<string>> = ref(['Temporada Regular', 'Playoff']);

  const changeSeason = (option:number) => {
    selectedSeason.value = (seasonOptions.value[option])

    loadingTeamsData.value = true;
    loadingLeagueStatus.value = true;

    getTeamsInfo(selectedSeason.value)
    .then((response: Teams) => {
      teams.value = response.teams;
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loadingTeamsData.value = false;
    })

  getLeagueStatus(selectedSeason.value)
    .then((response: LeagueInfo) => {
      leagueStatus.value = response;
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loadingLeagueStatus.value = false;
    })

  }

  const isLoadingAnything = ():boolean => {
  return loadingTeamsData.value || loadingLeagueStatus.value;
}

</script>

<template>
  
  <div class="main-view-header mt-4">
    <h2><span>{{$t('STANDINGS.HEADER')}}</span></h2>
  </div>
  <div class="standings-options mt-3">
    <button
      :class="`a-button button__primary${standingsMode===STANDINGS_MODE_DIVISION?'__active':''} .without-icon`"
      @click="()=>standingsMode=STANDINGS_MODE_DIVISION"
    >{{$t('STANDINGS.DIVISION').toUpperCase()}}</button>
    <button
      :class="`a-button button__primary${standingsMode===STANDINGS_MODE_LEAGUE?'__active':''} .without-icon`"
      @click="()=>standingsMode=STANDINGS_MODE_LEAGUE"
    >{{$t('STANDINGS.LEAGUE').toUpperCase()}}</button>
  </div>
  <div class="standings-filter mt-2">
    <DropDown :id="generateRandomId()" label="Ano" :options="seasonOptions" @change-selection="changeSeason"/>
    <DropDown :id="generateRandomId()" class="ml-1" label="Etapa" :options="stageOptions" />
  </div>
  <FootballLoader v-if="isLoadingAnything()" />
  <div v-else class="standings-tables mt-3">
    <div class="table-header">{{ $t('STANDINGS.CONFERENCE_NAME') }}</div>
    <div v-if="standingsMode===STANDINGS_MODE_DIVISION">
      <div v-for="(division, index) in leagueStatus?.settings.scheduleSettings.divisions" :key="index">
        <StandingsTable :division-name="division.divisionName" :teams="getTeamsByDivision(teams, division.divisionId)"/>
      </div>
    </div>
    <div v-else>
      <StandingsTable :division-name="$t('STANDINGS.ALL_TEAMS')" :teams="teams"/>
    </div>
    <StandingsLegend />
  </div>
</template>

<style scoped lang="scss">

  .standings-options {
    display: flex;

    button {
      width: 270px;
      height: 40px;
    }
  }

  .standings-filter {
    display: flex;
    text-align: left;
    width: 100%;
  }

  .standings-tables {
    width: 100%;
  }
  
</style>
