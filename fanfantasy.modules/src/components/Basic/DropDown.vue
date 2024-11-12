<script setup lang="ts">
  import { defineProps } from 'vue';

  type Props = {
    label: string;
    id:string;
    options: Array<string|number>;
    disabled?: boolean;
  }

  const props = defineProps<Props>();

  const emit = defineEmits(["changeSelection"]);

  const selectedOption = defineModel();

  const onSelection = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    selectedOption.value = target.value;
    emit('changeSelection', target.value);
  }

</script>

<template>
  <div class="wrapper">
    <label :for="`dropdown-${props.id}`" class="label">{{ props.label }}</label>
    <select :name="`dropdown-${props.id}`" :id="`dropdown-${props.id}`" :disabled="props.disabled" @change="onSelection">
      <option v-for="(opt, index) in options" :key="index" :value="index">{{ opt }}</option>
    </select>
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

    select{
      height: 40px;
      background-color: white;
      border:1px solid var(--ff-c-medium-grey);
      width: 200px;
      font-size: 16px;
      font-family: All-ProSans, sans-serif;
      padding: 11px 30px 8px 8px;

      option {
        font-family: All-ProSans, Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-weight: 300;
      }
    }
  }
</style>