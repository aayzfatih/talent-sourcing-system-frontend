<template>
  <nav class="bg-white border-b-2 border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="https://a0.anyrgb.com/pngimg/1130/990/resource-management-icon-set-new-product-development-human-resource-management-human-resource-labor-innovation-management-communication-human.png"
          class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-blue-600 text-2xl font-semibold whitespace-nowrap dark:text-white">Talent Sourcing
          System</span>
      </a>
      <button @click="openFormModal" class="px-3 py-3 w-40 text-center rounded-lg bg-blue-100 text-blue-600">
        Add Candidate →</button>
    </div>
  </nav>

</template>
<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['openFormModal'])
const openFormModal = () => {
  emit('openFormModal')
}
</script>