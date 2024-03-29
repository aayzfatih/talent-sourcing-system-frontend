<template>

  <div class="flex py-5 ">
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
  <CandidateHeader @openFormModal="changeFormModal" />

  <div
    class="align-middle min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg relative">

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
  candidateStore.List(currentPage, 2, value)
})
</script>
