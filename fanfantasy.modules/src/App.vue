<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import logo from '@/assets/img/league/fanfantasy.svg'
</script>

<template>
  <div class="container">
    <div class="nav">
      <img alt="Vue logo" class="logo" :src=logo width="300" height="200" />
      <div class="flex">
        <!-- RouterLink loads component -->
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
    </div>

    <!-- RouterView shows current component -->
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flex {
  display: flex;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

</style>
