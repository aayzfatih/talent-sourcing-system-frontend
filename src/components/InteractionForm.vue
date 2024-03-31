<template>
  <div class="max-w-screen-lg mx-auto p-5">
    <div class="grid grid-cols-1 md:grid-cols-12 border">
      <div class="bg-gray-900 md:col-span-4 p-10 text-white rounded-lg shadow-lg">
        <h3 class="text-2xl sm:text-3xl leading-normal font-extrabold text-center mb-4">
          Candidate Detail
        </h3>
        <div class="flex flex-col mt-8 space-y-5">
          <div class="bg-white p-4 rounded-lg shadow-md">
            <div class="flex flex-col justify-start">
              <span class="text-sm sm:text-base leading-normal tracking-tight text-blue-800">Name:</span>
              <h3 class="text-sm sm:text-base leading-normal text-gray-800">{{ candidateStore.selectedCandidate.name
                }}</h3>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md">
            <div class="flex flex-col">
              <span class="text-sm sm:text-base leading-normal tracking-tight text-blue-800">Surname:</span>
              <h3 class="text-sm sm:text-base leading-normal text-gray-800">{{
                candidateStore.selectedCandidate.surname }}</h3>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md">
            <div class="flex flex-col">
              <span class="text-sm sm:text-base leading-normal tracking-tight text-blue-800">Phone Number:</span>
              <h3 class="text-sm sm:text-base leading-normal text-gray-800">
                {{ candidateStore.selectedCandidate.phoneNumber }}</h3>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md">
            <div class="flex flex-col">
              <span class="text-sm sm:text-base leading-normal tracking-tight text-blue-800">Email:</span>
              <h3 class="text-sm sm:text-base leading-normal text-gray-800">{{ candidateStore.selectedCandidate.email
                }}</h3>
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="md:col-span-8 p-10">
        <h3 class="text-xl mb-4 leading-normal font-extraboldmb-4">
          Görüşmeyi Yapan Kişinin
        </h3>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              First Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" placeholder="Name">
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Last Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
              id="grid-last-name" type="text" placeholder="Doe">
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Content
            </label>
            <textarea v-model="formValue.content" rows="10"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "></textarea>
          </div>
          <button
            class="ml-3 px-5 py-2 rounded-full border-blue-500 border text-blue-500  transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Add
            Interaction</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';
import { useInteractionStore } from '@/stores/IntereactionStore';
import { useCandidateStore } from '@/stores/CandidateStore';
const candidateStore = useCandidateStore()
const interactionStore = useInteractionStore()

const formValue = ref({
  content: '',
  candidateResponded: false,
  canidateId: candidateStore.selectedCandidate.id,
  time: new Date().toISOString(),
})
const emit = defineEmits(['closeInteractionModal'])
const handleSubmit = () => {
  interactionStore.addInteraction(formValue.value);
  emit("closeInteractionModal")
}

</script>
