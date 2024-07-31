<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';

const currentIndex: Ref<number> = ref(0);

const setContentIndex = (index:number) => {
  currentIndex.value = index;
}

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
    <!-- <div class="col-2"></div> -->
    <div class="col-2 footer-content-column" v-for="(teamData, index) in ['Divisão 01', 'Divisão 02', 'Divisão 03', 'Divisão 04']" :key="index">
      <div class="footer-column-header mb-1">{{ teamData }}</div>
      <div class="footer-team-logo-container" v-for="(team, index) in ['@/assets/img/league/nfl-logo.png', '@/assets/img/league/nfl-logo.png', '@/assets/img/league/nfl-logo.png', '@/assets/img/league/nfl-logo.png']" :key="index">
        <img src="@/assets/img/league/nfl-logo.png" alt="" class="footer-team-logo mt-2">
      </div>
    </div>
    <!-- <div class="col-2"></div> -->
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
    margin: 0 300px;

    .footer-content-column {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .footer-team-logo-container {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      
      .footer-team-logo {
        width: 50px;
      }
    }
  }
}
</style>