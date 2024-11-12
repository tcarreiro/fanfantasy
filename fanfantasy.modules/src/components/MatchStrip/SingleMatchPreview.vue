<script setup lang="ts">
import type { StripMatchSummary, StripTeam } from '@/models/team.model';
import fanfantasyLogo from '@/assets/img/league/fanfantasy.svg';
import { ref } from 'vue';

  type Props = {
    active?: boolean;
    gameId: number;
    teams: StripMatchSummary;
    width: number;
  }

  const props = defineProps<Props>();

  const fallbackImages = ref({});

  const logoImg = (team: StripTeam) => {
    return fallbackImages.value[team.abbrev] ? fanfantasyLogo : team.logo
  };

  const onImageError = (team: StripTeam) => {
    fallbackImages.value = {
      ...fallbackImages.value,
      [team.abbrev]: true
    };
  };

  const emit = defineEmits(["onClick"]);

</script>

<template>
  <div class="match-container" @click="emit('onClick', props.gameId)" :style="`width: ${props.width}px;`">
    <div v-if="props.teams.started" class="top-border"></div>
    <div class="match-content">
      <div class="team-container">
        <div class="strip-team-logo">
          <img :src="logoImg(props.teams.awayTeam)"  alt="" class="strip-team-img" @error="onImageError(props.teams.awayTeam)">
        </div>
        <div class="strip-team-abbrev">{{ props.teams.awayTeam.abbrev }}</div>
        <div class="strip-team-score">{{ props.teams.awayTeam.score.toFixed(1) }}</div>
      </div>
      <div class="team-container">
        <div class="strip-team-logo">
          <img :src="logoImg(props.teams.homeTeam)"  alt="" class="strip-team-img" @error="onImageError(props.teams.homeTeam)">
        </div>
        <div class="strip-team-abbrev">{{ props.teams.homeTeam.abbrev }}</div>
        <div class="strip-team-score">{{ props.teams.homeTeam.score.toFixed(1) }}</div>
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
    cursor: pointer;
  }

  .match-container:first-child {
    border-left: 1px solid grey;
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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 800;
    font-size: 12px;
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