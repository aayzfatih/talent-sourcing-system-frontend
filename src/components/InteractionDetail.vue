<template>
  <div>
    <div v-if="err !== ''">{{ err }}</div>
    <div v-else>
      <p>{{ form.id }}</p>
      <p>{{ form.content }}</p>
      <p>{{ form.time }}</p>
      <p>{{ form.candidateResponded }}</p>
      <p>{{ form.candidateName }}</p>
      <p>{{ form.candidateSurname }}</p>
      <p>{{ form.candidateStatus }}</p>
      <button @click="closeInteractionDetailModal">Edit</button>
    </div>
  </div>
</template>

<script setup>
import { useInteractionStore } from "@/stores/IntereactionStore";
import { UnsecureAxios } from "@/utils/axios";
import { ref, defineProps, defineEmits } from "vue";
const form = ref({
  id: 0,
  content: '',
  time: '',
  candidateResponded: null,
  candidateName: '',
  candidateSurname: '',
  candidateStatus: ''
})
const err = ref("")
const props = defineProps({
  id: {
    type: Number,
    required: true
  }

})

UnsecureAxios.get(`/interactions/list/${props.id}`).then((response) => {
  form.value = response.data.data
}).catch((error) => {
  err.value = error.response.data.message;
})



const emit = defineEmits(["closeInteractionDetailModal"])
const closeInteractionDetailModal = () => {
  emit('closeInteractionDetailModal')
}
</script>
