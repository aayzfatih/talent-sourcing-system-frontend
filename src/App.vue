<template>
  <div class="mx-auto">
    <CandidateHeader @openFormModal="changeFormModal" />
    <div v-if="isFormModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <CandidateForm @closeFormModal="changeFormModal" />
      </div>
    </div>
    <CandidateList />
  </div>
</template>
<script setup>
import CandidateHeader from './components/CandidateHeader.vue';
import CandidateList from './components/CandidateList.vue'
import CandidateForm from './components/CandidateForm.vue'
import { ref } from 'vue'
const isFormModalOpen = ref(false)
const changeFormModal = () => {
  isFormModalOpen.value = !isFormModalOpen.value
}

</script>
