<template>
  <div class="container mx-auto px-4">
    <h1 class="font-bold text-xl flex items-center justify-center my-5">Candidates</h1>
    <CandidateList />
    <CandidateForm />
  </div>
</template>

<script setup>
import CandidateList from './components/CandidateList.vue'
import CandidateForm from './components/CandidateForm.vue'
</script>
