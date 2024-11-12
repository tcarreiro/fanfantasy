<script setup lang="ts">
  import { defineProps } from 'vue';

  type Props = {
    label: string;
    id:string;
    type?: string;
    disabled?: boolean;
  }

  const props = defineProps<Props>();

  const inputData = defineModel();


</script>

<template>
  <div class="wrapper">
    <label :for="`inputfield-${props.id}`" class="label">{{ props.label }}</label>
    <input v-model="inputData" :type="props.type??'text'" :name="`inputfield-${props.id}`" :id="`inputfield-${props.id}`" :disabled="props.disabled" >
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

    input{
      height: 40px;
      background-color: white;
      border:1px solid var(--ff-c-medium-grey);
      width: 200px;
      font-size: 16px;
      font-family: All-ProSans, sans-serif;
      padding: 11px 30px 8px 8px;
    }
  }
</style>