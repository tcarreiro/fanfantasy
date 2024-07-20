<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/navbar/NavBar.vue';
import MatchStrip from './components/MatchStrip/MatchStrip.vue';
</script>

<template>
  <div class="container">
    <MatchStrip />
    <NavBar />
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

</style>
