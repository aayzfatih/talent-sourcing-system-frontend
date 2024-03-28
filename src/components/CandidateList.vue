<template>
  <div class="container mx-auto p-4 ">
    <CandidateHeader @openModal="changeFormModal" />
    <div
      class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Name</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Surname</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Phone</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Email</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Status</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Actions</th>
            <th class="px-6 py-3 border-b-2 border-gray-300"></th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="candidate in candidateStore.candidates">
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
              <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                <span class="relative text-xs">{{ candidate.status }}</span>
              </span>
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5 cursor-pointer">
              <i @click="changeDetailModal" class="material-icons">visibility</i>
              <i @click="candidateStore.deleteCandidate(candidate.id)" class="material-icons ">delete</i>
              <i class="material-icons">edit</i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isFormModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <CandidateForm @closeModal="changeFormModal" />
      </div>
    </div>
    <div v-if="isDetailModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <CandidateDetail @closeDetailModal="changeDetailModal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCandidateStore } from '@/stores/CandidateStore';
import CandidateForm from './CandidateForm.vue'
import CandidateDetail from './CandidateDetail.vue'
import CandidateHeader from './CandidateHeader.vue'
const candidateStore = useCandidateStore()
const isFormModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const filter = ref('all')
const changeFormModal = () => {
  isFormModalOpen.value = !isFormModalOpen.value
}
const changeDetailModal = () => {
  isDetailModalOpen.value = !isDetailModalOpen.value
}
candidateStore.getAllCandidates()

</script>
