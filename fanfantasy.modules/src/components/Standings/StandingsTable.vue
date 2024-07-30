<script setup lang="ts">
  import type {StandingsTeam} from '@/models/team.model';
  import type { Ref } from 'vue';
  import { ref } from 'vue';
  import {TABLE_SORTING_DESCENDING} from '@/utils/constants';
  import SortingHeader from '../Basic/Tables/SortingHeader.vue';
  import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
  
  type Props = {
    divisionName: string;
    teams: Array<StandingsTeam>;
  }

  const props = defineProps<Props>();

  const { t } = useI18n();

  const sortedCol: Ref<number> = ref(4);
  const sortedType: Ref<number> = ref(TABLE_SORTING_DESCENDING);

  const divisionHeaderLabel:string[] = [
    props.divisionName.toUpperCase(),
    t('STANDINGS.WINS'),
    t('STANDINGS.LOSSES'),
    t('STANDINGS.DRAWS'),
    t('STANDINGS.TOTAL_PERCENT'),
    t('STANDINGS.POINTS_FOR'),
    t('STANDINGS.POINTS_AGAINST'),
    t('STANDINGS.NET_POINTS'),
    t('STANDINGS.HOME_RECORD'),
    t('STANDINGS.AWAY_RECORD'),
    t('STANDINGS.DIVISION_RECORD'),
    t('STANDINGS.DIVISION_PERCENT'),
    t('STANDINGS.STREAK'),
    t('STANDINGS.LAST_FIVE')
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

  return [...props.teams].sort((a, b) => {
    const fields = ['teamName', 'wins', 'losses', 'draws', 'totalPct', 'PF', 'PA', 'netPoints', 'homeRecord', 'awayRecord', 'divRecord', 'divPct', 'streak', 'lastRecord'];
    const field = fields[sortedCol.value];

    if (typeof a[field] === 'string') {
      return a[field].localeCompare(b[field]) * sortedType.value;
    }

    return (b[field] - a[field]) * sortedType.value;
  });
});

</script>

<template>
  <div class="standings-container mb-2">
    <table class="m-table">
      <thead>
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
          <td :class="getCellSortedStyle(index, 0)" class="text-left standings-team-logo">
            <img :src="team.teamLogo" alt="" class="standings-team-img mr-1">
            {{ team.teamName }}
          </td>
          <td :class="getCellSortedStyle(index, 1)" class="border-left">{{ team.wins }}</td>
          <td :class="getCellSortedStyle(index, 2)">{{ team.losses }}</td>
          <td :class="getCellSortedStyle(index, 3)">{{ team.draws }}</td>
          <td :class="getCellSortedStyle(index, 4)">{{ team.totalPct.toFixed(3) }}</td>
          <td :class="getCellSortedStyle(index, 5)" class="border-left">{{ team.PF }}</td>
          <td :class="getCellSortedStyle(index, 6)">{{ team.PA }}</td>
          <td :class="getCellSortedStyle(index, 7)">{{ team.PF - team.PA }}</td>
          <td :class="getCellSortedStyle(index, 8)" class="border-left">{{`${team.homeRecord}`}}</td>
          <td :class="getCellSortedStyle(index, 9)">{{`${team.awayRecord}`}}</td>
          <td :class="getCellSortedStyle(index, 10)" class="border-left">{{`${team.divRecord}`}}</td>
          <td :class="getCellSortedStyle(index, 11)">{{ team.divPct.toFixed(3) }}</td>
          <td :class="getCellSortedStyle(index, 12)" class="border-left">{{ `${team.streak}${team.streakType}` }}</td>
          <td :class="getCellSortedStyle(index, 13)">{{`${team.lastRecord}`}}</td>
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

    .m-table{

      
      thead {
        background-color: white;
      }

      th {
        cursor: pointer;
      }

      td,
      th {
        border-left: 0;
        border-right: 0;
      }

      .border-left {
        border-left: 1px solid var(--ff-c-off-white) !important;
      }
      
      tbody {
        .even-row {
          background-color: var(--ff-c-off-white2);
          &__sorted_active {
            background-color: rgba(0, 0, 0, 0.05) !important;
          }
        }
        
        .odd-row {
          background-color: white;
          &__sorted_active {
            background-color: rgba(0, 0, 0, 0.05) !important;
          }
        }
        
      }

      .standings-team-logo {
        display: flex;
        align-items: center;
      }

      .standings-team-img {
        width: 25px;
        height: 25px;
      }
    }

    .text-left {
      text-align: left!important;
    }
  }

</style>
