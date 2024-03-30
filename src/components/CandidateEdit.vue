<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Candidate</h2>
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col sm:gap-6 sm:mb-5">
          <div class="sm:col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" name="name" id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required="" v-model="formData.name">
          </div>
          <div class="sm:col-span-2">
            <label for="surname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input v-model="formData.surname" type="text" name="surname" id="surname"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Surname" required="">
          </div>
          <div class="sm:col-span-2">
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
            <input v-model="formData.phoneNumber" type="text" name="phone" id="phone" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
              focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Phone Number(544) 444-4444" required="">
          </div>
          <div class="sm:col-span-2">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email Addres</label>
            <input v-model="formData.email" type="email" name="email" id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Email Address" required="">
          </div>
          <div>
            <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
            <select v-model="formData.status" id="status"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required="">
              <option selected disabled>Choose a status</option>
              <option v-for="status in candidateStore.status" :value="status">{{ status }}</option>
            </select>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button type="submit"
            class="text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
            Edit Candidate
          </button>
          <button @click="deleteCandidateItem" type="button"
            class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
            <i class="material-icons">delete</i>
            Delete
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { useCandidateStore } from '@/stores/CandidateStore';
import { computed, defineEmits } from 'vue'
const candidateStore = useCandidateStore()

const formData = computed(() => ({
  id: candidateStore.selectedCandidate.id,
  name: candidateStore.selectedCandidate.name,
  surname: candidateStore.selectedCandidate.surname,
  phoneNumber: candidateStore.selectedCandidate.phoneNumber,
  email: candidateStore.selectedCandidate.email,
  status: candidateStore.selectedCandidate.status,
}))
const emit = defineEmits(['closeEditModal'])

const handleSubmit = () => {
  candidateStore.updateCandidate(formData.value.id, formData.value);
  emit('closeEditModal')
}
const deleteCandidateItem = () => {
  candidateStore.deleteCandidate(formData.value.id);
  emit('closeEditModal')
}
</script>
