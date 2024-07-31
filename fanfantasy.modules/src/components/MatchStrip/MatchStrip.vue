<script setup lang="ts">
  import type { StripTeam } from '@/models/team.model';
  // import FootballLoader from '../Loader/FootballLoader.vue'
  import FanfantasyLoader from '../Loader/FanfantasyLoader.vue';
  import SingleMatchPreview from './SingleMatchPreview.vue';
  import type { Ref } from 'vue';
  import { ref, computed, onUnmounted, onMounted } from 'vue';
  import { getCurrentMatchs } from '@/services/fanfantasy.service';

  const data: Ref<Array<StripTeam>> = ref([]);
  const loadingData: Ref<boolean> = ref(true);
  const currentPage: Ref<number> = ref(0);
  const visibleMatchs: Ref<number> = ref(8);
  const matchupCardWidth: Ref<number> = ref(window.innerWidth);
  const arrowButtonWidth: Ref<number> = ref(40);
  const showStrip: Ref<boolean> = ref(true);


  onMounted(() => {
    getCurrentMatchs(2024, 1)
    .then((response: Array<StripTeam>) => {
      data.value = response;
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loadingData.value = false;
    });

    window.addEventListener('resize', getCardWidth);

    onUnmounted(() => {
      window.removeEventListener('resize', getCardWidth);
    });
  });

  const getCardWidth = ():number => {
    const minCardWidth = 150;
    const maxCardWidth = 180;
    let totalAvailableSpace: number = window.innerWidth - 2 * arrowButtonWidth.value;
    showStrip.value = true;

    if (totalAvailableSpace <= minCardWidth) {
      console.log("hiding...")
      showStrip.value = false;
      visibleMatchs.value = 0;
      return 0;
    } else if (totalAvailableSpace <= 2 * minCardWidth) {
      visibleMatchs.value = 1;
    } else if (totalAvailableSpace <= 4 * minCardWidth) {
      visibleMatchs.value = 2;
    } else if (totalAvailableSpace <= 6 * minCardWidth) {
      visibleMatchs.value = 4;
    } else if (totalAvailableSpace <= 8 * minCardWidth) {
      visibleMatchs.value = 6;
    } else {
      visibleMatchs.value = 8;
    }

    matchupCardWidth.value = totalAvailableSpace / visibleMatchs.value;
    return Math.max(minCardWidth, Math.min(maxCardWidth, matchupCardWidth.value));
    };

  const getTeamsInPairs = (teams: Array<StripTeam>): Array<Array<StripTeam>> => {
    const pairs: Array<Array<StripTeam>> = [];
    for (let i = 0; i < teams.length; i += 2) {
      pairs.push(teams.slice(i, i + 2));
    }
    return pairs;
  };

  const pairs = computed(() => getTeamsInPairs(data.value));
  const totalPages = computed(() => Math.ceil(pairs.value.length / visibleMatchs.value));

  const visiblePairs = computed(() => {
    const start = currentPage.value * visibleMatchs.value;
    const end = start + visibleMatchs.value;
    return pairs.value.slice(start, end);
  });

  const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 0) {
      currentPage.value--;
    }
  };
</script>

<template>
  <div v-if="showStrip" class="match-strip">
    <button v-if="totalPages > 1"
      class="a-button button__arrow .without-icon"
      @click="prevPage"
      :disabled="currentPage === 0"
    >
      <i class="fi fi-rr-angle-small-left"></i>
    </button>
    <!-- <FootballLoader v-if="loadingData" /> -->
    <FanfantasyLoader v-if="loadingData" />
    <div v-else class="pairs-container">
      <SingleMatchPreview
        v-for="(teamPair, index) in visiblePairs"
        :key="index"
        :teams="teamPair"
        :game-id="index"
        :width="getCardWidth()"
        @on-click="()=>{console.log(`clicked on game ${index}`)}"
      />
    </div>
    <button v-if="totalPages > 1"
      class="a-button button__arrow .without-icon"
      @click="nextPage"
      :disabled="currentPage === totalPages - 1"
    >
      <i class="fi fi-rr-angle-small-right"></i>
    </button>
  </div>
</template>

<style scoped lang="scss">
  .match-strip {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pairs-container {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    justify-content: center;
  }

  button {
    width: 80px;
    height: 91px;
  }
</style>