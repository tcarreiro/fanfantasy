<script setup lang="ts">
import type { TeamStandings } from '@/models/team.model';
import type { Ref } from 'vue';
import { ref } from 'vue';
import logo from '@/assets/img/league/fanfantasy-cropped.svg'
import {getTeamsByDivision} from '@/utils/teams';
import type { LeagueInfo } from '@/models/league.model';
import fanfantasyLogo from '@/assets/img/league/fanfantasy.svg';

type Props = {
  teams: Array<TeamStandings>;
  leagueStatus: LeagueInfo|null;
}

const props = defineProps<Props>();

const currentIndex: Ref<number> = ref(0);
const fallbackImages = ref({}); // not found team logos

const setContentIndex = (index:number) => {
  currentIndex.value = index;
}

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
<div class="footer-container mt-3">
  <div class="footer-navbar">
    <ul class="footer-navigation-list">
      <li
      v-for="(label, index) in ['TEAMS', 'GENERAL & MEDIA INFO', 'INITIATIVES', 'PLAYER SERVICES', 'MORE NFL SITES']"
      :key="index"
      class="footer-navigation-link"
      :class="{ active: index === currentIndex }"
      @click="setContentIndex(index)"
      >
        {{ label }}
      </li>
    </ul>
  </div>
  <div class="footer-content mt-3">
    <div class="col-2 footer-content-column" v-for="(division, index) in props.leagueStatus?.settings.scheduleSettings.divisions" :key="index">
      <div class="footer-column-header mb-1">{{ division.divisionName }}</div>
      <div class="footer-team-logo-container" v-for="(team, teamIndex) in getTeamsByDivision(props.teams, division.divisionId)" :key="teamIndex">
        <img :src="logoImg(team)"  alt="" class="footer-team-logo mt-2" @error="onImageError(team)">
      </div>
    </div>
  </div>
  <div class="app-download mt-3"></div>
  <div class="copyright-disclaimer mt-3">
    <img alt="Fanfantasy logo" class="logo mt-1" :src=logo width="100" height="200" />
  </div>
</div>
</template>

<style lang="scss">
.footer-container {
  background-color: var(--ff-c-dark-grey2);
  width: 100%;
  min-height: 400px;
  color: var(--ff-c-off-white2);
  z-index: 10;
  font-family: All-ProSans,Helvetica,Arial,sans-serif;
  font-weight: 500;
  
  .footer-navbar {
    color:white;
    background-color: var(--ff-c-dark-grey);
    height: 50px;
    display: flex;
    flex-grow: 1;
    padding: 0;
    justify-content: center;

    .footer-navigation-list {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 60px;
      width: 100%;
    }

    .footer-navigation-link {
      position: relative;
      border-bottom: 2px solid transparent;

    }

    .footer-navigation-list li {
      display: flex;
      align-items: center;
      margin: 0 8px;
      height: 100%;
      font-size: 14px;
      color: var(--ff-c-off-white2);
      padding-bottom: 5px;
      font-weight: bold;
      cursor: pointer;
    }

    .footer-navigation-list .active {
      border-bottom: 2px solid var(--ff-c-off-white2);
    }
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    margin: 0 25%;

    .footer-content-column {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .footer-team-logo-container {
        width: 100%;
        display: flex;
        justify-content: center;
        cursor: pointer;
      }
      
      .footer-team-logo {
        width: 75px;
        height: 75px;
        object-fit: cover;
        border-radius: 25%;
      }

      .footer-column-header {
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
      }
    }
  }

  .app-download {
    min-height: 70px;
    border-top: 1px solid var(--ff-c-light-dark-grey);
  }

  .copyright-disclaimer {
    min-height: 200px;
    background-color: var(--ff-c-blue);
    display: flex;
    justify-content: center;
    
    .logo {
      font-size: 14px;
      position: relative;
      transition: none;
      z-index: 10;
      display: block;
      height: 80px;
      border: 0;
    }
  }
}
</style>