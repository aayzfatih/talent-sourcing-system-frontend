<template>
  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
    <div class="text-sm leading-5 text-blue-900">{{ candidate.name }}</div>
  </td>
  <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
    {{ candidate.surname }}</td>
  <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
    {{ candidate.phoneNumber }}</td>
  <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
    {{ candidate.email }}</td>
  <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
    {{ candidate.status }}
  </td>
  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5 cursor-pointer">
    <i @click="candidateStore.deleteCandidate(candidate.id)" class="material-icons ">delete</i>
    <i @click="openEditModal" class="material-icons">edit</i>
  </td>
  <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
    <button @click="openDetailModal"
      class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View
      Details</button>
  </td>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useCandidateStore } from '@/stores/CandidateStore';
const candidateStore = useCandidateStore()
const emit = defineEmits(['openDetailModal', 'openEditModal'])
const props = defineProps({
  candidate: {
    type: Object,
    required: true
  }
})
const openDetailModal = () => {
  emit('openDetailModal')
}
const openEditModal = () => {
  emit('openEditModal')
}
</script>
