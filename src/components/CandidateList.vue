<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            First Name
          </th>
          <th scope="col" class="px-6 py-3">
            Last Surname
          </th>
          <th scope="col" class="px-6 py-3">
            Phone Number
          </th>
          <th scope="col" class="px-6 py-3">
            Email Address
          </th>
          <th scope="col" class="px-6 py-3">
            Status
          </th>
          <th scope="col" class="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="candidate in candidateStore.getSourcedCandidates"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

          <td class="px-6 py-4">
            {{ candidate.name }}
          </td>
          <td class="px-6 py-4">
            {{ candidate.surname }}
          </td>
          <td class="px-6 py-4">
            {{ candidate.phoneNumber }}
          </td>
          <td class="px-6 py-4">
            {{ candidate.email }}
          </td>
          <td class="px-6 py-4">
            {{ candidate.status }}
          </td>
          <td class="px-6 py-4 flex flex-row gap-2 cursor-pointer ">
            <i @click="candidateStore.deleteCandidate(candidate.id)" class="material-icons ">delete</i>
            <i class="material-icons">edit</i>
          </td>
        </tr>

      </tbody>
    </table>
  </div>

</template>

<script setup>
import { useCandidateStore } from '@/stores/CandidateStore';

const candidateStore = useCandidateStore()
candidateStore.getAllCandidates()

</script>
