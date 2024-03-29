<template>
  <div class="container mx-auto p-4 ">
    <CandidateHeader @getAllCandidateItems="handleGetAllCandidates"
      @getSourcedCandidateItems="handleGetSourcedCandidates" @openFormModal="changeFormModal"
      @openEditModal="changeEditModal" />
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
          <tr v-if="filter === 'all'" v-for="candidate in candidateStore.candidates">
            <CandidateItem @openEditModal="changeEditModal" @openDetailModal="changeDetailModal"
              :candidate="candidate" />
            <div v-if="isEditModalOpen"
              class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
              <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <CandidateEdit :candidata="candidate" @closeEditModal="changeEditModal" />
              </div>
            </div>
          </tr>
          <tr v-else-if="filter === 'sourced'" v-for="candidate in candidateStore.getSourcedCandidates">
            <CandidateItem @openEditModal="changeEditModal" @openDetailModal="changeDetailModal"
              :candidate="candidate" />
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="prevPage">Önceki</button>
    <button @click="nextPage" :disabled="currentPage == totalPages - 1"> Sonraki </button>

    <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <CandidateEdit @closeEditModal="changeEditModal" />
      </div>
    </div>
    <div v-if="isFormModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/4">
        <CandidateForm @closeFormModal="changeFormModal" />
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
import CandidateItem from './CandidateItem.vue'
import CandidateEdit from './CandidateEdit.vue'
const candidateStore = useCandidateStore()
const isFormModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const isEditModalOpen = ref(false)
const filter = ref('all')

const totalPages = candidateStore.totalPages;
const currentPage = candidateStore.currentPage;
candidateStore.List(currentPage, 2)

const nextPage = () => candidateStore.nextPage();
const prevPage = () => candidateStore.prevPage();

candidateStore.getStatus();
const changeFormModal = () => {
  isFormModalOpen.value = !isFormModalOpen.value
}
const changeDetailModal = () => {
  isDetailModalOpen.value = !isDetailModalOpen.value
}
const changeEditModal = () => {
  isEditModalOpen.value = !isEditModalOpen.value
}
const handleGetAllCandidates = () => {
  filter.value = 'all'
}
const handleGetSourcedCandidates = () => {
  filter.value = "sourced"
}

</script>
