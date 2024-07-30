<script setup lang="ts">
import { TABLE_SORTING_DESCENDING } from '@/utils/constants';
import type { Ref } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';


  type Props = {
    activeSorting?: boolean;
    sortingOrder?: number;
    label: string;
    sideBorded?: boolean;
    index: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    activeSorting: false,
    sortingOrder: TABLE_SORTING_DESCENDING,
    sideBorded: false,
  });

  const emit = defineEmits(["sortChange"]);

  const sortedCol: Ref<boolean> = ref(props.activeSorting);
  const sortedType: Ref<number> = ref(props.sortingOrder);

  watch(
    () =>  props.activeSorting,
    (isActive) => (sortedCol.value = isActive)
  );

  const changeSortedCol = () => {
    if (!sortedCol.value) sortedType.value = TABLE_SORTING_DESCENDING;
    else sortedType.value = -1*sortedType.value;
    emit('sortChange', props.index, sortedType.value);
  }

</script>

<template>
  <th :class="`${sortedCol ? 'sorted_active':  ''} ${props.sideBorded ? 'border-left' : ''}`" @click="changeSortedCol()">
    <div class="content">
      {{ props.label }}
      <i v-if="sortedCol" :class="`fi fi-rr-angle-small-${sortedType === TABLE_SORTING_DESCENDING ? 'down' : 'up'}`"></i>
    </div>
  </th>
</template>

<style scoped lang="scss">
  th {
    cursor: pointer;
    border-left: 0;
    border-right: 0;
    min-width: 70px;
    position: relative;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
  }

  .sorted_active {
    background-color: rgba(0, 0, 0, 0.05) !important;
    
    i {
      position: absolute;
      right: -13px;
      top: 0;
      color: var(--ff-c-dark-grey);
      font-size: 16px;
      cursor: pointer;
    }

    i:hover {
      color: #CCC;
    }
  }

  .border-left {
    border-left: 1px solid var(--ff-c-off-white) !important;
  }
</style>