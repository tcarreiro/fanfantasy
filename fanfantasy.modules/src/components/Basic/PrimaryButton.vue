<script setup lang="ts">
  import { defineProps } from 'vue';

  type Props = {
    label: string;
    id:string;
    disabled?: boolean;
    width?:number;
  }

  const props = defineProps<Props>();

  const emit = defineEmits(["onClick"]);

  const onClick = () => {
    emit("onClick")
  }

</script>

<template>
  <div class="wrapper">
    <button
      :style="props.width?`width: ${props.width}px` : `width: 100%` "
      :class="`a-button button__primary${!props.disabled?'__active':''} .without-icon`"
      :id="`button-${props.id}`"
      @click="()=>onClick()"
    >{{label}}</button>
  </div>
</template>

<style scoped lang="scss">
  .wrapper{
    display:flex;
    flex-direction: column;
    
    label {
      color: var(--ff-c-light-dark-grey);
      text-align: left;
      font-size: 12px;
      font-weight: 100;
      text-transform: uppercase;
    }

    button {
      height: 40px;
    }
  }
</style>