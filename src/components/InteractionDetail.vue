<template>

  <div v-if="err !== ''">
    <i class="material-icons cursor-pointer" @click="closeInteractionDetailModal">west</i>
    <p> {{ err }}</p>
  </div>
  <div v-else>
    <i class="material-icons cursor-pointer" @click="closeInteractionDetailModal">west</i>
    <div class="bg-white overflow-hidden shadow rounded-lg border">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Candidate View
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          This is some information about the candidate interactions.
        </p>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Name
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ form.candidateName }}
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Surname
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ form.candidateSurname }}
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Status
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ form.candidateStatus }}
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Time
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ form.createdTime }}
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Content
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <textarea v-model="form.content" id="message" rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="flex items-center space-x-4 mt-3">
      <button type="submit" @click="editInteraction"
        class="text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
        Edit Candidate
      </button>
      <button @click="deleteCandidateInteraction" type="button"
        class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
        <i class="material-icons">delete</i>
        Delete
      </button>
    </div>
  </div>

</template>

<script setup>
import { useInteractionStore } from "@/stores/IntereactionStore";
import { UnsecureAxios } from "@/utils/axios";
import { ref, defineProps, defineEmits } from "vue";
const emit = defineEmits(["closeInteractionDetailModal"])
const intereactionStore = useInteractionStore()
const err = ref("")
const form = ref({
  id: 0,
  content: '',
  createdTime: '',
  candidateResponded: null,
  candidateName: '',
  candidateSurname: '',
  candidateStatus: ''
})
const props = defineProps({
  id: {
    type: Number,
    required: true
  }

})
const closeInteractionDetailModal = () => {
  emit("closeInteractionDetailModal")
}

UnsecureAxios.get(`/interactions/list/${props.id}`).then((response) => {
  form.value = response.data.data
  let dateString = form.value.createdTime
  const hasUTCOffset = /[+-]\d{2}:\d{2}$|Z$/.test(dateString);

  if (!hasUTCOffset) {
    dateString += "Z";
  }
  const date = new Date(dateString);
  const locale = localStorage.getItem("locale") || "tr-TR"
  form.value.createdTime = date.toLocaleDateString(locale, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).replace(",", "");

}).catch((error) => {
  err.value = error.response.data.message;
})
const editInteraction = () => {
  intereactionStore.updateInteraction(form.value.id, form.value)
    .then(res => emit('closeInteractionDetailModal'))
    .catch(err => console.log(err))
}
const deleteCandidateInteraction = () => {
  intereactionStore.deleteInteraction(form.value.id)
    .then(res => emit('closeInteractionDetailModal'))
    .catch(err => console.log(err))
}
</script>
