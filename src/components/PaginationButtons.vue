<template>
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
      <nav class=" z-0 inline-flex shadow-sm">
        <div>
          <button @click="prevPage"
            class=" inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Previous">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div>
          <button v-for="pageNumber in candidateStore.totalPages" @click="changePage(pageNumber)" :key="pageNumber"
            class="-ml-px  inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-100 text-sm leading-5 font-medium text-gray-900 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-blue-900 hover:text-white"
            :class="{ 'bg-blue-600 text-white hover:bg-blue-400 focus:ring-blue-300': pageNumber === candidateStore.currentPage + 1 }">
            {{ pageNumber }}
          </button>
        </div>
        <div>
          <button @click="nextPage" :disabled="candidateStore.currentPage == candidateStore.totalPages - 1"
            class="-ml-px  inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
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
</template>

<script setup>
import { useCandidateStore } from '@/stores/CandidateStore';
const candidateStore = useCandidateStore()
import { defineProps } from 'vue';

const props = defineProps({
  status: {
    type: String,
    default: "",
  },
})
candidateStore.List({ page: 0, status: '' })
const nextPage = () => candidateStore.nextPage(props.status);
const changePage = (pageNumber) => { candidateStore.changePage(pageNumber, props.status) }
const prevPage = () => candidateStore.prevPage(props.status);
</script>
