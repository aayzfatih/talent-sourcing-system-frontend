<template>
  <CandidateHeader @openFormModal="changeFormModal" />
  <div class="flex p-5 relative shadow-lg">
    <div>
      <label v-if="showFilters" class="absolute top-[22px] right-12 text-xs cursor-pointer" @click="clearFilter()">
        Clear Filter
      </label>
      <button class="absolute top-5 right-4" @click="showFilters = !showFilters">
        <Icon name="filter" class="w-6 h-6 dark:stroke-white stroke-gray-950" />
      </button>
    </div>
    <div class="">
      <div v-if="showFilters" class="">
        <Selectbox v-model="form.status" :options="status" />
      </div>
    </div>
  </div>
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
        <CandidateItem @openEditModal="changeEditModal" @openDetailModal="changeDetailModal" :candidate="candidate" />
        <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
          <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <CandidateEdit :candidata="candidate" @closeEditModal="changeEditModal" />
          </div>
        </div>
      </tr>
      <tr v-else-if="filter === 'sourced'" v-for="candidate in candidateStore.getSourcedCandidates">
        <CandidateItem @openEditModal="changeEditModal" @openDetailModal="changeDetailModal" :candidate="candidate" />
      </tr>
    </tbody>
  </table>
  <nav class="flex flex-row items-center justify-center p-4 rounded bg-white space-x-2">
    <a @click="prevPage"
      class="p-1 rounded border text-black bg-white hover:text-white hover:bg-blue-600 hover:border-blue-600" href="#">
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      </svg>
    </a>
    <p class="text-gray-500">Page {{ candidateStore.currentPage + 1 }} of 10</p>
    <a @click="nextPage" :disabled="currentPage == totalPages - 1" class=" p-1 rounded border text-black bg-white
      hover:text-white hover:bg-blue-600 hover:border-blue-600" href="#">
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </a>
  </nav>

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

</template>

<script setup>
import { ref, watch } from 'vue'
import { useCandidateStore } from '@/stores/CandidateStore';
import CandidateForm from './CandidateForm.vue'
import CandidateDetail from './CandidateDetail.vue'
import CandidateHeader from './CandidateHeader.vue'
import CandidateItem from './CandidateItem.vue'
import CandidateEdit from './CandidateEdit.vue'
import Icon from "./icon/icon.vue";
import Selectbox from "./select-box.vue";
const candidateStore = useCandidateStore()
const isFormModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const isEditModalOpen = ref(false)
const form = ref({
  status: '',
})
const filter = ref('all')
const showFilters = ref(false);
const totalPages = candidateStore.totalPages;
const currentPage = candidateStore.currentPage;
candidateStore.List(currentPage, 3, "")
const clearFilter = () => {
  showFilters.value = false;
  form.value.status = '';
  candidateStore.List(currentPage, 3, "")
};

const status = [
  { id: 'Hired', name: 'Hired' },
  { id: 'Sourced', name: 'Sourced' },
  { id: 'Interviewing', name: 'Interviewing' },
  { id: 'Offer_Sent', name: 'Offer_Sent' },
]
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
watch(() => form.value.status, (value) => {
  candidateStore.List(currentPage, 3, value)
})
</script>
