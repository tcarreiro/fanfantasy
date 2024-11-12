<script setup lang="ts">
  import type { Ref } from 'vue';
  import { ref, computed } from 'vue';
  import {TABLE_SORTING_DESCENDING} from '@/utils/constants';
  import { getPctFromRecord, getRecordString } from '@/utils/records';
  import { roundToDecimal } from '@/utils/math';
  import SortingHeader from '../Basic/Tables/SortingHeader.vue';
  import { useI18n } from 'vue-i18n';
  import fanfantasyLogo from '@/assets/img/league/fanfantasy.svg';
  import { compareStrings, compareNumbers } from '@/utils/compares';
  import type { Record, TeamStandings } from '@/models/team.model';
import { useProTeamStore } from '@/stores/app';
  
  type Props = {
    divisionName: string;
    teams: Array<TeamStandings>;
  }

  const props = defineProps<Props>();
  const {getSelectedSeason} = useProTeamStore();

  const { t } = useI18n();

  const sortedCol: Ref<number> = ref(4);
  const sortedType: Ref<number> = ref(TABLE_SORTING_DESCENDING);

  const fallbackImages = ref({}); // not found team logos

  const divisionHeaderLabel:string[] = [
    props.divisionName.toUpperCase(),
    t('STANDINGS.LEGEND.LABEL.WINS'),
    t('STANDINGS.LEGEND.LABEL.LOSSES'),
    t('STANDINGS.LEGEND.LABEL.TIES'),
    t('STANDINGS.LEGEND.LABEL.WINNING_PERC'),
    t('STANDINGS.LEGEND.LABEL.POINTS_FOR'),
    t('STANDINGS.LEGEND.LABEL.POINTS_AGAINST'),
    t('STANDINGS.LEGEND.LABEL.NET_POINTS'),
    t('STANDINGS.LEGEND.LABEL.HOME_RCD'),
    t('STANDINGS.LEGEND.LABEL.ROAD_RCD'),
    t('STANDINGS.LEGEND.LABEL.DIV_RCD'),
    t('STANDINGS.LEGEND.LABEL.DIV_PERC'),
    t('STANDINGS.LEGEND.LABEL.STREAK'),
    t('STANDINGS.LEGEND.LABEL.LAST_FIVE')
  ];

  const leftBordedHeader: number[] = [
    1, 5, 8, 10, 12
  ];

  const getRowStyle = (index:number):string => {
    return index%2===1?"even-row":"odd-row";
  }

  const getCellSortedStyle = (index:number, col:number):string => {
    let evenning = getRowStyle(index)
    return col===sortedCol.value ? evenning+"__sorted_active" :"";
  }

  const setSortCol = (index: number, sorting: number) => {
    sortedCol.value = index;
    sortedType.value = sorting;
  };

  const sortedTeams = computed(() => {
  if (sortedCol.value === null) {
    return props.teams;
  }

  // TODO: streak and last5
  return [...props.teams].sort((a, b) => {
    const fields = ['teamName', 'wins', 'losses', 'ties', 'percentage', 'pointsFor', 'pointsAgainst', 'netPoints', 'home', 'away', 'division', 'division', 'streak', 'last5'];
    const field = fields[sortedCol.value];

    if (field === 'wins') {
      return compareNumbers(a.record.overall.wins, b.record.overall.wins) * sortedType.value;
    }

    if (field === 'losses') {
      return compareNumbers(a.record.overall.losses, b.record.overall.losses) * sortedType.value;
    }

    if (field === 'ties') {
      return compareNumbers(a.record.overall.ties, b.record.overall.ties) * sortedType.value;
    }

    if (field === 'netPoints') {
      return compareNumbers((a.record.overall.pointsFor - a.record.overall.pointsAgainst), (b.record.overall.pointsFor - b.record.overall.pointsAgainst)) * sortedType.value;
    }

    if (field === 'pointsFor') {
      return compareNumbers(a.record.overall[field], b.record.overall[field]) * sortedType.value;
    }

    if (field === 'pointsAgainst') {
      return compareNumbers(b.record.overall[field], a.record.overall[field]) * sortedType.value;
    }
    
    if (field === 'last5') {
      return compareNumbers(a.record.overall.percentage, b.record.overall.percentage) * sortedType.value;
    }
    
    if (typeof a[field] === 'string') {
      return compareStrings(a[field], b[field]) * sortedType.value;
    }
    
    if (typeof a.record[field] === 'object') {
      return compareNumbers(a.record[field].percentage, b.record[field].percentage) * sortedType.value;
    }
    
    return compareNumbers(b.playoffSeed, a.playoffSeed) * sortedType.value;
  });
});

  const getNetPoints = (record:Record):number => {
    return roundToDecimal((record.pointsFor -  record.pointsAgainst), 1)
  };

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
  <div class="standings-container mb-2">
    <table class="m-table--primary">
      <thead class="--sortable">
        <tr>
          <SortingHeader v-for="(label, index) in divisionHeaderLabel"
            :key="index"
            :index="index"
            :active-sorting="sortedCol===index"
            :label="label"
            :side-borded="leftBordedHeader.includes(index)"
            @sortChange="setSortCol"
          />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in sortedTeams" :key="index" :class="`${getRowStyle(index)}`">
          <td :class="getCellSortedStyle(index, 0)" class="standings-team-logo">
            <img :src="logoImg(team)"  alt="" class="standings-team-img mr-1" @error="onImageError(team)">
            {{ team.teamName }}
          </td>
          <td :class="getCellSortedStyle(index, 1)" class="border-left">{{ team.record.overall.wins }}</td>
          <td :class="getCellSortedStyle(index, 2)">{{ team.record.overall.losses }}</td>
          <td :class="getCellSortedStyle(index, 3)">{{ team.record.overall.ties }}</td>
          <td :class="getCellSortedStyle(index, 4)">{{ getPctFromRecord(team.record.overall) }}</td>
          <td :class="getCellSortedStyle(index, 5)" class="border-left">{{ roundToDecimal(team.record.overall.pointsFor, 1) }}</td>
          <td :class="getCellSortedStyle(index, 6)">{{ roundToDecimal(team.record.overall.pointsAgainst, 1) }}</td>
          <td :class="getCellSortedStyle(index, 7)">{{ getNetPoints(team.record.overall) }}</td>
          <td :class="getCellSortedStyle(index, 8)" class="border-left">{{ getRecordString(team.record.home) }}</td>
          <td :class="getCellSortedStyle(index, 9)">{{ getRecordString(team.record.away) }}</td>
          <td :class="getCellSortedStyle(index, 10)" class="border-left">{{ getRecordString(team.record.division) }}</td>
          <td :class="getCellSortedStyle(index, 11)">{{  getPctFromRecord(team.record.division) }}</td>
          <td :class="getCellSortedStyle(index, 12)" class="border-left">{{ `${team.record.overall.streakLength}${team.record.overall.streakType.substring(0,1)}` }}</td>
          <td :class="getCellSortedStyle(index, 13)">{{ getRecordString(team.record.overall) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
  .standings-container {
    width: 100%;
    overflow-x: auto;
    box-sizing: border-box;

    .standings-team-logo {
      display: flex;
      align-items: center;
      min-width: 205px;
    }

    .standings-team-img {
      width: 28px;
      height: 28px;
      object-fit: cover;
      border-radius: 25%;
    }
  }

</style>
