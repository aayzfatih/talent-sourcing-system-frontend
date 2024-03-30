<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex p-5 mx-5 relative">
      <div>
        <label v-if="showFilters" class="absolute top-[22px] right-12 text-xs cursor-pointer" @click="clearFilter()">
          Clear Filter
        </label>
        <button class="absolute top-5 right-4" @click="showFilters = !showFilters">
          <i class="material-icons">filter_list</i>
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
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name</th>
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
      <tbody class="bg-white ">
        <tr v-for="candidate in candidateStore.candidates">
          <CandidateItem @openEditModal="changeEditModal" @openDetailModal="changeDetailModal" :candidate="candidate" />
        </tr>
      </tbody>
    </table>
    <div v-if="isDetailModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <CandidateDetail @closeDetailModal="changeDetailModal" />
      </div>
    </div>
    <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <CandidateEdit @closeEditModal="changeEditModal" />
      </div>
    </div>

    <PaginationButtons />

    <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <CandidateEdit @closeEditModal="changeEditModal" />
      </div>
    </div>


  </div>

</template>

<script setup>
import { ref, watch } from 'vue'
import { useCandidateStore } from '@/stores/CandidateStore';
import CandidateDetail from './CandidateDetail.vue'
import CandidateItem from './CandidateItem.vue'
import CandidateEdit from './CandidateEdit.vue'
import PaginationButtons from './PaginationButtons.vue'
import Selectbox from "./select-box.vue";

const candidateStore = useCandidateStore()
const isDetailModalOpen = ref(false)
const isEditModalOpen = ref(false)
const showFilters = ref(false);
const form = ref({
  status: '',
})

//Get states from stores
const currentPage = candidateStore.currentPage;
candidateStore.getStatus();


const status = [
  { id: 'Hired', name: 'Hired' },
  { id: 'Sourced', name: 'Sourced' },
  { id: 'Interviewing', name: 'Interviewing' },
  { id: 'Offer_Sent', name: 'Offer_Sent' },
]

//Change modal state
const changeDetailModal = () => {
  isDetailModalOpen.value = !isDetailModalOpen.value
}
const changeEditModal = () => {
  isEditModalOpen.value = !isEditModalOpen.value
}

//filter by status
const clearFilter = () => {
  showFilters.value = false;
  form.value.status = '';
  candidateStore.List(currentPage, 3, "")
};

watch(() => form.value.status, (value) => {
  candidateStore.List(currentPage, 3, value)
})
</script>
