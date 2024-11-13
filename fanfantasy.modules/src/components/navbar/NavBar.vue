<script setup lang="ts">
  import { RouterLink, useRoute } from 'vue-router'
  import logo from '@/assets/img/league/fanfantasy-cropped.svg'
  import { pageViews } from '@/router';
  import { computed, onMounted, ref, Ref } from 'vue';
  import { changeTab, updateCurrentIndex } from '@/utils/route';
  import { useLeagueState } from '@/stores/app';
import AuthForm from '../Auth/AuthForm.vue';

  const leagueState = useLeagueState();
  const route = useRoute();

  const isDropdownVisible:Ref<boolean> = ref(false);

  onMounted(() => {
    updateCurrentIndex(route.path);
  });

  const getVisiblePageViews = computed(() => {
    return pageViews.filter(view => view.showOnNavBar);
  });

  const getSubViews = computed(() => {
    return pageViews
      .filter(view => view.index == leagueState.currentViewIndex)
      .flatMap(view => view.subviews);
  });

  const getPageViewTag = (name) => {
    return `NAVBAR.${name.toUpperCase().replace(/-/g, '_')}`;
  }

  const getPageSubViewTag = (name) => {
    return `NAVBAR_SEC.${name.toUpperCase().replace(/-/g, '_')}`;
  }

  const toggleLoginDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
  };


</script>

<template>
  <div class="nav">
    <img alt="Fanfantasy logo" class="logo ml-1 mr-1" :src=logo width="100" height="200" />
    <div class="header-navigation">
      <ul class="header-navigation-list">
        <li
          v-for="(view, index) in getVisiblePageViews"
          :key="view.name"
          class="header-navigation-link"
          :class="{ active: index === leagueState.currentViewIndex }"
        >
          <RouterLink :to="view.path" @click="()=>{leagueState.currentViewIndex = changeTab(index)}">
            {{ $t(getPageViewTag(view.name)) }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="login-container">
      <li class="login-btn mr-3" @click="toggleLoginDropdown">Login</li>
      <AuthForm v-if="isDropdownVisible" class="dropdown-container" />
    </div>
  </div>
  <div class="header-navigation-secondary">
    <ul class="header-navigation-secondary-list ml-7">
      <li
      v-for="(subview, index) in getSubViews"
      :key="index"
      class="header-navigation-secondary-link"
      >
        <RouterLink :to="subview.path" @click="()=>{}">
          {{ $t(getPageSubViewTag(subview.name)) }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.nav {
  color: var(--ff-c-off-white2);
  background-color: var(--ff-c-blue);
  width: 100%;
  align-items: center;
  height: 64px;
  display: flex;
  position: relative;
  z-index: 10;
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
  padding: 0;
  width: 100%;
  height: 50px;
}

.header-navigation-secondary {
  display: flex;
  flex-grow: 1;
  padding: 0;
  align-items: center;
}

.header-navigation-secondary-list {
  display: flex;
  align-items: center;
}

.header-navigation-secondary-link {
  position: relative;
  border-bottom: 2px solid transparent;

}

.header-navigation-secondary-list li a {
  margin: 0 8px;
  font-size: 14px;
  color: var(--ff-c-dark-grey);
  padding-bottom: 5px;
  font-weight: bold;
  cursor: pointer;
}

.header-navigation-secondary-list li:hover a,
.header-navigation-secondary-list .active a {
  border-bottom: 2px solid var(--ff-c-dark-grey);
}

.login-btn{
  margin: 0 8px;
  font-size: 14px;
  color: var(--ff-c-off-white2);
  padding-bottom: 5px;
  font-weight: bold;
  cursor: pointer;
}

</style>