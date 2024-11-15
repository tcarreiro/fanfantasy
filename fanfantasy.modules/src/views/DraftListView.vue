<script setup lang="ts">
  import FootballLoader from '@/components/Loader/FootballLoader.vue';
  import DraftPlayerCard from '@/components/Draft/DraftPlayerCard.vue';
  import { DraftListInfo } from '@/models/draft-list.model';
  import { getDraftList } from '@/services/draft.service';
  import { onMounted, ref, type Ref } from 'vue';

  const data:Ref<Array<DraftListInfo>> = ref([]);
  const loadingData:Ref<boolean> = ref(true);

  const emit = defineEmits(["changeSeason"]);

  const createEmptyEntries = () => {
    for (let i = 0; i<5; i++) {
      data.value.push(new DraftListInfo("QB"));
      data.value.push(new DraftListInfo("RB"));
      data.value.push(new DraftListInfo("WR"));
      data.value.push(new DraftListInfo("TE"));
    }
  }

  onMounted(() => {
    getDraftList(2024)
    .then((response: Array<DraftListInfo>) => {
      data.value = response.map((player) => {
          if (player.position === 'FB') return { ...player, position: 'RB' };
          return player;
        });
      createEmptyEntries();
      data.value.sort((a, b) => {
        if (a.position < b.position) return -1;
        if (a.position > b.position) return 1;
        const aLastName = a.fullName.split(" ")[1] || "";
        const bLastName = b.fullName.split(" ")[1] || "";

        return aLastName.localeCompare(bLastName)
      });
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loadingData.value = false;
    })
  });

</script>

<template>
  <FootballLoader v-if="loadingData"/>
  <div v-else class="draft-list">
    <DraftPlayerCard v-for="(opt, index) in data" :playerData="opt" :key="index"/>
  </div>
</template>

<style>
.draft-list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 1.6rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
