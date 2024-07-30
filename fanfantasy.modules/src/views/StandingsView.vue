<script setup lang="ts">
  import DropDown from '@/components/Basic/DropDown.vue';
  import FootballLoader from '@/components/Loader/FootballLoader.vue';
  import StandingsTable from '@/components/Standings/StandingsTable.vue';
  import StandingsLegend from '@/components/Standings/StandingsLegend.vue';
  import type { Division } from '@/models/team.model';
  import { getTeamsInfo } from '@/services/fanfantasy.service';
  import type { Ref } from 'vue';
  import { onMounted,ref } from 'vue';
  import { STANDINGS_MODE_DIVISION, STANDINGS_MODE_LEAGUE} from '@/utils/constants';
import { generateRandomId } from '@/utils/random';

  const allTeams:Ref<Array<Division>> = ref([]);
  const season:Ref<number> = ref(0);
  const leagueStage:Ref<number> = ref(0);
  const loadingData:Ref<boolean> = ref(true);
  const standingsMode:Ref<number> = ref(STANDINGS_MODE_DIVISION);

  const seasonOptions:Ref<Array<string>> = ref(['2023', '2022', '2021', '2020', '2019', '2018']);
  const stageOptions:Ref<Array<string>> = ref(['Temporada Regular', 'Playoff']);

  onMounted(() => {
    getTeamsInfo(Number(seasonOptions[season.value]))
    .then((response) => {
      allTeams.value = response;
    })
    // TODO catch
    .finally(() => {
      loadingData.value = false;
    })
  })
</script>

<template>
  
  <div class="standings-header mt-4">
    <h2><span>Standings</span></h2>
  </div>
  <div class="standings-options mt-3">
    <button
      :class="`a-button button__primary${standingsMode===STANDINGS_MODE_DIVISION?'__active':''} .without-icon`"
      @click="()=>standingsMode=STANDINGS_MODE_DIVISION"
    >DIVISÃO</button>
    <button
      :class="`a-button button__primary${standingsMode===STANDINGS_MODE_LEAGUE?'__active':''} .without-icon`"
      @click="()=>standingsMode=STANDINGS_MODE_LEAGUE"
    >LIGA</button>
  </div>
  <div class="standings-filter mt-2">
    <DropDown v-model="season" :id="generateRandomId()" label="Ano" :options="seasonOptions" />
    <DropDown v-model="leagueStage" :id="generateRandomId()" class="ml-1" label="Etapa" :options="stageOptions" />
  </div>
  <div v-if="loadingData" class="mt-4">
    <FootballLoader />
  </div>
  <div v-else class="standings-tables mt-3">
    <div class="table-header">{{ $t('STANDINGS.CONFERENCE_NAME') }}</div>
    <div v-if="standingsMode===STANDINGS_MODE_DIVISION">
      <div v-for="(division, divisionId) in allTeams" :key="divisionId">
        <StandingsTable :division-name="division.name" :teams="division.teams"/>
      </div>
    </div>
    <div v-else>
      <StandingsTable :division-name="$t('STANDINGS.ALL_TEAMS')" :teams="allTeams.flatMap(division => division.teams)"/>
    </div>
    <StandingsLegend />
  </div>
<button @click="()=> {console.log(seasonOptions[season]+' / '+stageOptions[leagueStage])}">Check</button>
</template>

<style scoped lang="scss">
  .table-header {
    text-transform: uppercase;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    -ms-flex-preferred-size: 100%;
    align-items: center;
    background-color: var(--ff-c-off-white2);
    -webkit-box-shadow: inset 0 -1px 0 0 #ccc;
    box-shadow: inset 0 -1px 0 0 #ccc;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-basis: 100%;
    flex-grow: 1;
    height: 48px;
    padding-left: 16px;
    width: 100%;
  }

  .standings-header {
    display: flex;
    width: 100%;
    justify-content: left;
    border-bottom: 1px solid #CCC;

    >h2 {
      border-bottom: 2px solid var(--ff-c-dark-grey);
      padding-bottom: 3px;
      font-size: 20px;
      font-weight: bold!important;
    }
  }

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
