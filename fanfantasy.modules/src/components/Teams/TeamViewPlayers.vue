<script setup lang="ts">
  import type { Ref } from 'vue';
  import { ref } from 'vue';
  import type { LeagueInfo } from '@/models/league.model';
  import type { Player } from '@/models/player.model';
  import type { TeamStandings } from '@/models/team.model';
  import {getPlayerStats} from '@/services/fanfantasy.service';
  import FootballLoader from '../Loader/FootballLoader.vue';
  import { onBeforeMount } from 'vue';
  import TeamViewRosterGroupsTable from './TeamViewRosterGroupsTable.vue';
import { EMPTY_PLAYER } from '@/utils/constants';
import { watch } from 'vue';

  type Props = {
    team: TeamStandings;
    leagueStatus: LeagueInfo;
    week:number;
    season:number;
  }

  const props = defineProps<Props>();
  const players:Ref<Array<Player>> = ref([]);
  const sortingRoster:Ref<Boolean> = ref(true);

  watch(() => props.week, () => {
    sortingRoster.value = true;
    fetchPlayers();
  });

  const getPlayersByTeamId = (teamId:number):Player[] => {
    return players.value.filter(player=>player.periodTeamId === teamId);
  }

  const sortRoster = () => {
    players.value.sort((a, b) => {
      if (a.lineupSlotId === 16) return 1;
      if (b.lineupSlotId === 16) return -1;
      return a.lineupSlotId - b.lineupSlotId;
    });
  };

  const validateLineupSlots = (players: Player[]) => {
    const slotCount: { [key: number]: number } = {};
    players.forEach(player => {
      slotCount[player.lineupSlotId] = (slotCount[player.lineupSlotId] || 0) + 1;
    });
    
    const expectedSlotCount: { [key: number]: number } = {};
    props.leagueStatus.settings.rosterSettings.slotIdList.forEach(slotId => {
      expectedSlotCount[slotId] = (expectedSlotCount[slotId] || 0) + 1;
    });
    
    const checkSlot = (slotId: number, expected: number) => {
      const actual = slotCount[slotId] || 0;
      if (actual < expected) {
        const missing = expected - actual;
        for (let i = 0; i < missing; i++) {
          let emptyPlayer = { ...EMPTY_PLAYER };
          emptyPlayer.lineupSlotId = slotId;
          players.push(emptyPlayer);
        }
      }
    };
    
    Object.keys(expectedSlotCount).forEach(slotId => {
      checkSlot(Number(slotId), expectedSlotCount[slotId]);
    });

  };

  const getStartingRoster = ():Player[] => {
    return players.value.filter(player=>player.lineupSlotId !== 20 && player.lineupSlotId !== 21);
  }

  const getBenchedPlayers = ():Player[] => {
      return players.value.filter(player=>player.lineupSlotId == 20);
  }

  const getIRPlayers = ():Player[] => {
      return players.value.filter(player=>player.lineupSlotId == 21);
  }

  onBeforeMount(()=>{
    fetchPlayers();
  });

  const fetchPlayers = async () => {
    getPlayerStats(props.season, props.week, props.team.teamId)
    .then((response:Array<Player>) => {
      players.value=response;
    })
    .finally(()=>{
      players.value = getPlayersByTeamId(props.team.teamId);
      sortRoster();
      validateLineupSlots(players.value);
      sortingRoster.value=false;
    });
  }
  
</script>

<template>
  <div class="team-players-container mt-1 flex">
    <FootballLoader v-if="sortingRoster" />
    <table v-else class="m-table--primary">
      <thead>
        <tr>
          <th class="--strong" colspan="2">
            Jogadores
          </th>
          <th class="--strong border-left" colspan="4">
            Semana {{ week }}
          </th>
        </tr>
        <tr>
          <th class="--strong col-1">
            Posição
          </th>
          <th class="--strong col-3">
            Nome
          </th>
          <th class="--strong col-2 border-left">
            Oponente
          </th>
          <th class="--strong col-2">
            Horário
          </th>
          <th class="--strong col-2">
            Projeção
          </th>
          <th class="--strong col-2">
            Pontuação
          </th>
        </tr>
      </thead>
      <TeamViewRosterGroupsTable :players="getStartingRoster()" :season="props.season" :week="props.week" :has-total-row="true" />
      <TeamViewRosterGroupsTable :players="getBenchedPlayers()" :season="props.season" :week="props.week" :has-total-row="true" />
      <TeamViewRosterGroupsTable :players="getIRPlayers()" :season="props.season" :week="props.week" />
    </table>
  </div>
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
