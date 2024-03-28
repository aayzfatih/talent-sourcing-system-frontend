<template>
  <div>
    <button @click="closeDetailModal">Close Modal</button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['closeDetailModal'])
const closeDetailModal = () => {
  emit("closeDetailModal")
}
</script>
