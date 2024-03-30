<template>
  <div>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 class="text-lg font-semibold mb-4">Interaction Detail of {{
          interactionStore.currentInteraction.candidateName }} {{
          interactionStore.currentInteraction.candidateSurname }}</h2>
        <p><strong>Type:</strong> Phone</p>
        <p><strong>Content:</strong> {{ interactionStore.currentInteraction.content }}</p>
        <p><strong>Date:</strong> {{ interactionStore.currentInteraction.time }}</p>
        <p><strong>Candidate Responded:</strong> {{ interactionStore.currentInteraction.candidateResponded ? "Yes" :
          "No" }}
        </p>
        <div class="mt-4 flex justify-end">
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">Edit</button>
          <button @click="closeDetailModal"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { useInteractionStore } from '@/stores/IntereactionStore';
const interactionStore = useInteractionStore()
const emit = defineEmits(['closeDetailModal'])
const closeDetailModal = () => {
  emit("closeDetailModal")
}

</script>
