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
    <CandidateStatus :candidateStatus="candidate.status" />
  </td>
  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5 cursor-pointer">
    <i @click="openDetailModal" class="material-icons">visibility</i>
    <i @click="candidateStore.deleteCandidate(candidate.id)" class="material-icons ">delete</i>
    <i class="material-icons">edit</i>
  </td>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useCandidateStore } from '@/stores/CandidateStore';
import CandidateStatus from './CandidateStatus.vue';
const candidateStore = useCandidateStore()
const emit = defineEmits(['openDetailModal'])
const props = defineProps({
  candidate: {
    type: Object,
    required: true
  }
})
const openDetailModal = () => {
  emit('openDetailModal')
}
</script>
