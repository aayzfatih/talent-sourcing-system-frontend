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
  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
    <div v-if="showStatus">
      <Selectbox :placeholder="candidate.status" v-model="form.status" :options="status" />
    </div>
    <div class="flex items-center" v-else>
      {{ candidate.status }}
      <i @click="showStatus = !showStatus" class="material-icons cursor-pointer">keyboard_arrow_down</i>
    </div>

  </td>
  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5 cursor-pointer">
    <i @click="deleteCandidate(candidate.id)" class="material-icons ">delete</i>
    <i @click="openEditModal(candidate.id)" class="material-icons">edit</i>
  </td>
  <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
    <button @click="openInteractionModal"
      class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Add
      Interaction</button>
  </td>
  <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
      <CandidateEdit :candidateId="candidate.id" @closeEditModal="closeEditModal" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import { useCandidateStore } from '@/stores/CandidateStore';
import CandidateEdit from './CandidateEdit.vue'
import Selectbox from "./select-box.vue";
const isEditModalOpen = ref(false)
const showStatus = ref(false)
const candidateStore = useCandidateStore()
const emit = defineEmits(['openInteractionModal', 'openEditModal'])
const props = defineProps({
  candidate: {
    type: Object,
    required: true
  }
})
const form = ref({
  status: '',
})
const status = [
  { id: 'Hired', name: 'Hired' },
  { id: 'Sourced', name: 'Sourced' },
  { id: 'Interviewing', name: 'Interviewing' },
  { id: 'Offer_Sent', name: 'Offer_Sent' },
]

const openInteractionModal = () => {
  emit('openInteractionModal')
}
const openEditModal = (id) => {
  candidateStore.getCandidateById(id)
  isEditModalOpen.value = !isEditModalOpen.value
}
const closeEditModal = () => {
  isEditModalOpen.value = !isEditModalOpen.value
}
const deleteCandidate = (id) => {
  candidateStore.deleteCandidate(id)
}
watch(() => form.value.status, (value) => {
  candidateStore.updateStatusById(props.candidate.id, value).then((res) => {
    if (res) {
      form.value.status = res.data.data.status
      showStatus.value = !showStatus.value
    }
  })
})

</script>
