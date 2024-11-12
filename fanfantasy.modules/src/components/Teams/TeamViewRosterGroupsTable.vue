<script setup lang="ts">
import PlayerTinyCard from './PlayerTinyCard.vue';
import type { PlayerStats, Player } from '@/models/player.model';
import { getSlotNameById } from '@/utils/players';
import { useProTeamStore } from '@/stores/app';
import { roundToDecimal } from '@/utils/math';
import { formatMatchDate } from '@/utils/date';
import type { NFLSchedule } from '@/models/nfl-team.model';
import { computed } from 'vue';

  type Props = {
    players: Player[];
    week:number;
    season:number;
    hasTotalRow?:boolean;
  }

  const props = defineProps<Props>();
  const {getProTeamById, getNFLMatchByWeek} = useProTeamStore();

  const nflMatchs = computed(()=>getNFLMatchByWeek(props.week));

  const getRowStyle = (index:number):string => {
    return index%2===1?"even-row":"odd-row";
  }

  const getGroupTotalProjection = (): number => {
    let totalScore = 0;
    props.players.forEach(player => {
      const playerScore = (player.playerId === -1 ? 0 : getPlayerWeekProjection(player.playerStats));
      totalScore += playerScore;
    })
    return roundToDecimal(totalScore,1);
  }
  
  const getGroupTotalScore = (): number => {
    let totalScore = 0;
    props.players.forEach(player => {
      const playerScore = (player.playerId === -1 ? 0 : getPlayerWeekScore(player.playerStats));
      totalScore += typeof playerScore === 'number' ? playerScore : 0;
    })
    return roundToDecimal(totalScore,1);
  }

  const getPlayerWeekProjection = (playerStat: PlayerStats[]):number => {
    const p = playerStat
              .find(ps=>ps.periodSeasonId===props.season
                  && ps.scoringPeriodId === props.week
                  && ps.statSourceId===1
                  && ps.statSplitTypeId===1)?.totalPeriodScore!;
      return roundToDecimal(p,1);
  }

  const getPlayerWeekScore = (playerStat: PlayerStats[]):number|string => {
    const p = playerStat
              .find(ps=>ps.periodSeasonId===props.season
                  && ps.scoringPeriodId === props.week
                  && ps.statSourceId===0
                  && ps.statSplitTypeId===1)?.totalPeriodScore!;
      if (!p) return "--";
      return roundToDecimal(p,1);
  }

  const getProSchedule = (proTeamId: number):string => {
    return formatMatchDate(nflMatchs.value.filter(mt => mt.awayTeamId === proTeamId || mt.homeTeamId === proTeamId )[0].date)
  }

  const getProScheduleIsHomeTeam = (proTeamId: number):string => {
    const match:NFLSchedule = nflMatchs.value.filter(mt => mt.awayTeamId === proTeamId || mt.homeTeamId === proTeamId )[0]
    if (match.homeTeamId===proTeamId) return getProTeamById(match.awayTeamId)?.teamAbbrev!;
    return `@${getProTeamById(match.homeTeamId)?.teamAbbrev}`;
  }

</script>

<template>
    <tbody>
      <tr v-for="(player, index) in props.players" :key="index" :class="`${getRowStyle(index)}`">
        <td class="color-medium-grey font-12">{{ getSlotNameById(player.lineupSlotId) }}</td>
        <td><PlayerTinyCard :player="player" /></td>
        <td v-if="player.playerId !== -1 && player.proTeamId > 0" class="border-left blue-font">{{ getProScheduleIsHomeTeam(player.proTeamId) }}</td>
        <td v-else class="border-left">--</td>
        <td v-if="player.playerId !== -1 && player.proTeamId > 0" class="blue-font">{{ getProSchedule(player.proTeamId) }}</td>
        <td v-else></td>
        <td v-if="player.playerId !== -1 && player.proTeamId > 0" class="color-medium-grey font-12">{{ getPlayerWeekProjection(player.playerStats).toFixed(1) }}</td>
        <td v-else>--</td>
        <td v-if="player.playerId !== -1 && player.proTeamId > 0" class="color-medium-grey font-12">{{ getPlayerWeekScore(player.playerStats) }}</td> <!-- TODO: .toFixed(1) -->
        <td v-else>--</td>
      </tr>
    </tbody>
    <tbody v-if="props.hasTotalRow" class="subtotal-row">
      <tr>
        <td class="text-align-right color-medium-grey" colspan="4"><strong>TOTAL</strong></td>
        <td class="color-medium-grey"><strong>{{ getGroupTotalProjection().toFixed(1) }}</strong></td>
        <td class="color-medium-grey"><strong>{{ getGroupTotalScore().toFixed(1) }}</strong></td>
      </tr>
    </tbody>
</template>

<style scoped lang="scss">
  .team-players-container {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    border-radius: 15px;
    background-color: var(--ff-c-off-white2);

    thead {
      tr,
      th {
        height: 23px!important;
      }
    }

    .standings-team-logo {
      display: flex;
      align-items: center;
      width: 205px;
    }

    .standings-team-img {
      width: 25px;
      height: 25px;
    }

    .font-12 {
      font-size: 12px!important;
    }

    .color-medium-grey {
      color: var(--ff-c-medium-grey);
    }

    .blue-font {
      color: var(--ff-c-light-blue);
    }

    .subtotal-row {
      background-color: var(--ff-c-lighter-grey);
    }
  }
</style>
