<template>
  <span v-if="candidateStatus === 'Sourced'"
    class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
    <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
    <span class="relative text-xs">{{ candidateStatus }}</span>
  </span>
  <span v-else-if="candidateStatus === 'Interviewing'"
    class="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
    <span aria-hidden class="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
    <span class="relative text-xs">{{ candidateStatus }}</span>
  </span>
  <span v-else-if="candidateStatus === 'Offer Sent'"
    class="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
    <span aria-hidden class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
    <span class="relative text-xs">{{ candidateStatus }}</span>
  </span>
  <span v-else class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
    <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
    <span class="relative text-xs">{{ candidateStatus }}</span>
  </span>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  candidateStatus: {
    type: String,
    required: true
  }
})
</script>
