<template>
  <div class="sm:flex items-center justify-between m-5 ">
    <div class="flex items-center">
      <h1>Talent Sourcing System </h1>
    </div>
    <button
      class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      <p class="text-sm font-medium leading-none text-white" @click="openFormModal">Add Candidates</p>
    </button>
  </div>
</template>
<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['openFormModal'])
const openFormModal = () => {
  emit('openFormModal')
}

</script>