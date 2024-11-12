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
  <th :class="`${sortedCol ? 'sorted-active':  ''} ${props.sideBorded ? 'border-left' : ''}`" @click="changeSortedCol()">
    {{ props.label }}
    <i v-if="sortedCol" :class="`fi fi-rr-angle-small-${sortedType === TABLE_SORTING_DESCENDING ? 'down' : 'up'}`"></i>
  </th>
</template>

<style scoped lang="scss">
</style>