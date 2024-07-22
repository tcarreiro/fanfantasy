<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import logo from '@/assets/img/league/fanfantasy.svg'
import { appBasePath } from '@/router';

  const changeTab = (nth:number) => {
    let links = document.querySelectorAll('.header-navigation-link');
    links.forEach(link => {
        link.classList.remove('active');
    });
    links[nth-1].classList.add('active');
  }
</script>

<template>
  <div class="nav">
    <img alt="Fanfantasy logo" class="logo" :src=logo width="300" height="200" />
      <div class="header-navigation">
        <ul class="header-navigation-list">
          <li class="header-navigation-link active">
            <RouterLink :to="appBasePath+'/'" @click="changeTab(1)">{{ $t('NAVBAR.HOME') }}</RouterLink>
          </li>
          <li class="header-navigation-link">
            <RouterLink :to="appBasePath+'/'" @click="changeTab(2)">{{ $t('NAVBAR.STANDINGS') }}</RouterLink>
          </li>
          <li class="header-navigation-link">
            <RouterLink :to="appBasePath+'/'" @click="changeTab(3)">{{ $t('NAVBAR.RANKINGS') }}</RouterLink>
          </li>
          <li class="header-navigation-link">
            <RouterLink :to="appBasePath+'/about'" @click="changeTab(4)">{{ $t('NAVBAR.NEXT_GEN') }}</RouterLink>
          </li>
          <li class="header-navigation-link">
            <RouterLink :to="appBasePath+'/draft-list'" @click="changeTab(5)">{{ $t('NAVBAR.DRAFT_LIST') }}</RouterLink>
          </li>
        </ul>
      </div>
  </div>
  <div class="header-navigation-secondary"></div>
</template>

<style>
.nav {
  color: var(--ff-c-off-white2);
  background-color: var(--ff-c-blue);
  align-items: center;
  height: 64px;
  display: flex;
  position: relative;
  z-index: 10;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.47);
  font-family: All-ProSans,Helvetica,Arial,sans-serif;
  font-weight: 500;
}

.logo {
  font-size: 14px;
  position: relative;
  transition: none;
  z-index: 10;
  display: block;
  height: 80px;
  border: 0;
}

.header-navigation {
  display: flex;
  flex-grow: 1;
  padding: 0;
  align-items: center;
}

.header-navigation-list {
  display: flex;
  align-items: center;
}

.header-navigation-link {
  position: relative;
  top: var(--nav-items-top-position);
  border-bottom: 2px solid transparent;

}

.header-navigation-list li a {
  margin: 0 8px;
  font-size: 14px;
  color: var(--ff-c-off-white2);
  padding-bottom: 5px;
  font-weight: bold;
  cursor: pointer;
}

.header-navigation-list li:hover a,
.header-navigation-list .active a {
  border-bottom: 2px solid var(--ff-c-off-white2);
}

.header-navigation-secondary {
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.47);
  color: var(--ff-c-dark-grey);
  left: 0;
  overflow: auto;
  right: 0;
  z-index: 3;
  padding: 0 16px 0 96px;
  width: 100%;
  height: 50px;
}

</style>