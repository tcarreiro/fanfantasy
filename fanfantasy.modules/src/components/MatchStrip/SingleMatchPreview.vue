<script setup lang="ts">
import type { StripTeam } from '@/models/team.model';

  type Props = {
    active?: boolean;
    gameId: number;
    teams: Array<StripTeam>;
    width: number;
  }

  const props = defineProps<Props>();

  const emit = defineEmits(["onClick"]);

</script>

<template>
  <div class="match-container" @click="emit('onClick')" :style="`width: ${props.width}px;`">
    <div class="top-border"></div>
    <div class="match-content">
      <div v-for="(team, index) in props.teams" :key="index" class="team-container">
        <div class="strip-team-logo">
          <img class="strip-team-img" :src="team.logo"/>
        </div>
        <div class="strip-team-abbrev">{{ team.abbrev }}</div>
        <div class="strip-team-score">{{ team.score.toFixed(1) }}</div>
      </div>
    </div>
    <div class="bottom-border"></div>
  </div>
</template>

<style scoped lang="scss">
  .match-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-right: 1px solid grey;
  }

  .match-container:hover {
    background-color: var(--ff-c-lighter-grey);
  }

  .top-border,
  .bottom-border {
    display: flex;
    width: 100%;
  }
  
  .top-border {
    border-top: 3px solid red;
  }
  
  .bottom-border {
    border-bottom: 3px solid blue;
  }

  .match-content {
    display: flex;
    flex-direction: column;
    height: 85px;
    width: 100%;
  }

  .team-container {
    display: flex;
    height: 50%;
    width: 100%;
  }

  .strip-team-abbrev,
  .strip-team-score,
  .strip-team-logo {
    flex: 1;
    display: flex;
    align-items: center;
  }
  
  .strip-team-logo {
    justify-content: center;
    margin-left: 5px;
  }
  
  .strip-team-img {
    width: 25px;
    height: 25px;
  }
  
  .strip-team-abbrev {
    margin-right: 5px;
    margin-left: 5px;
    flex: 6;
  }

  .strip-team-score {
    margin-right: 5px;
    justify-content: center;
  }
  

</style>