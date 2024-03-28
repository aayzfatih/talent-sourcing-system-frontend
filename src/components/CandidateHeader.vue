<template>
  <div class="sm:flex items-center justify-between m-5">
    <div class="flex items-center">
      <button @click="getSourcedItems"
        class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800">
        <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
          <p>Sourced</p>
        </div>
      </button>
      <button @click="getAllCandidateItems"
        class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8">
        <div class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
          <p>All</p>
        </div>
      </button>
    </div>
    <button class=" focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start
        justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
      <p class="text-sm font-medium leading-none text-white" @click="openFormModal">Add Candidates</p>
    </button>
  </div>
</template>
<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['openModal', 'getSourcedItems', 'getAllCandidateItems'])
const openFormModal = () => {
  emit('openModal')
}
const getSourcedItems = () => {
  emit('getSourcedItems')
}
const getAllCandidateItems = () => {
  emit('getAllCandidateItems')
}
</script>