import { defineStore } from "pinia";
import { UnsecureAxios } from "@/utils/axios";
const path = "/interactions";

export const useInteractionStore = defineStore("interactions", {
  state: () => ({
    interactions: [],
    currentInteraction: {},
  }),
  actions: {
    async interactionList(id) {
      const response = await UnsecureAxios.get(`${path}/list/${id}`);
      // this.interactions = response.data.data;
      this.currentInteraction = response.data.data;
    },
  },
});
