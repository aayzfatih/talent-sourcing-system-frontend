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
    <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <CandidateEdit :candidata="candidate" @closeEditModal="changeEditModal" />
      </div>
    </div>
    <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
      <div>
        <p class="text-sm leading-5 text-blue-700">
          Showing page
          <span class="font-medium">{{ candidateStore.currentPage + 1 }}</span>
          of
          <span class="font-medium">{{ candidateStore.totalPages }}</span>
          pages
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex shadow-sm">
          <div>
            <button @click="prevPage"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Previous">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div>
            <button
              class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
              1
            </button>
            <button
              class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
              2
            </button>
            <button
              class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
              3
            </button>
          </div>
          <div>
            <button @click="nextPage" :disabled="currentPage == totalPages - 1"
              class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Next">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </div>

    <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <CandidateEdit @closeEditModal="changeEditModal" />
      </div>
    </div>

    <div v-if="isDetailModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <CandidateDetail @closeDetailModal="changeDetailModal" />
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
import Selectbox from "./select-box.vue";

const candidateStore = useCandidateStore()
const isDetailModalOpen = ref(false)
const isEditModalOpen = ref(false)
const showFilters = ref(false);
const form = ref({
  status: '',
})

//Get states from stores
const totalPages = candidateStore.totalPages;
const currentPage = candidateStore.currentPage;
candidateStore.getStatus();

//List of candidates
candidateStore.List(currentPage, 3, "")

//clear filter
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

//Pagination
const nextPage = () => candidateStore.nextPage();
const prevPage = () => candidateStore.prevPage();

//Change modal state
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
