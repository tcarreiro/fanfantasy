<script setup lang="ts">
import { RouterView } from 'vue-router'
import MatchStrip from '@/components/MatchStrip/MatchStrip.vue';
import NavBar from '@/components/navbar/NavBar.vue';
</script>

<template>
  <div class="container">
    <MatchStrip />
    <NavBar />
    <div class="main-content">
      <RouterView />
    </div>
    
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
}
/* TODO: mediaquery 1300px por causa da tabela */
.main-content {
  display: flex;
  width: 1250px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

</style>
