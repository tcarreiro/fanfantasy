<script setup lang="ts">
import type { TeamStandings } from '@/models/team.model';
import fanfantasyLogo from '@/assets/img/league/fanfantasy.svg';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { LeagueInfo } from '@/models/league.model';
import { getRecordString } from '@/utils/records';
import { getDivisionNameById } from '@/utils/teams';


  type Props = {
    team: TeamStandings;
    divisionSeed:number;
    leagueStatus: LeagueInfo;
  }

  const props = defineProps<Props>();
  const fallbackImages = ref({}); // not found team logos

  const {t} = useI18n();

  const logoImg = (team: TeamStandings) => {
    return fallbackImages.value[team.teamName] ? fanfantasyLogo : team.logoUrl
  };

  const onImageError = (team: TeamStandings) => {
    fallbackImages.value = {
      ...fallbackImages.value,
      [team.teamName]: true
    };
  };

  const getShortStandings = ():string => {
    return `
      ${getRecordString(props.team.record.overall)}
      (${props.divisionSeed}
      ${t("ORDENAL")},
      ${getDivisionNameById(props.leagueStatus?.settings.scheduleSettings.divisions, props.team.divisionId)}
      )`;
  };

</script>

<template>
  <!-- <div class="team-colored-border mt-3 "></div> -->
  <div class="team-header-container mt-3 flex">
    <img :src="logoImg(props.team)" alt="" class="col-2 team-header-img ml-3 mr-3" @error="onImageError(team)">
    <div class="col-10 text-align-left">
      <div class="flex">
        <h1><span>{{ props.team.teamName }}</span></h1>
        <div class="team-record ml-3">{{ getShortStandings() }}</div>
      </div>
      <div class="flex">
        <div class="team-manager">{{ props.team.manager }}</div><!-- {{ props.team.manager }}</div> -->
        <div class="team-budget ml-2">{{$t('BUDGET')}}: {{ `$${100-props.team.acquisitionBudgetSpent.budgetSpent}` }}</div><!-- {{ props.team.budget }}</div> -->
      </div>
      <!-- TODO: last & next/current matchup -->
    </div>
  </div>
</template>

<style scoped lang="scss">
  // .team-colored-border {
  //   border-top-left-radius: 5px;
  //   border-top-right-radius: 5px;
  //   background-color: blue;
  //   height: 5px;
  // }

  .team-header-container {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    // border-bottom-left-radius: 5px;
    // border-bottom-right-radius: 5px;
    border-radius: 15px;
    background-color: var(--ff-c-off-white2);

    .team-header-img {
      height: 88px;
      width: 88px;
      object-fit: cover;
      border-radius: 25%;
    }

    .team-record {
      align-content: center;
      color: var(--ff-c-medium-grey);
      font-size: 18px;
    }

    .team-manager {
      color: var(--ff-c-medium-grey);
    }
    
    .team-budget {
      color: var(--ff-c-light-blue);
    }
  }
</style>
