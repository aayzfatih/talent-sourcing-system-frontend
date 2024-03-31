import { defineStore } from "pinia";
import { UnsecureAxios } from "@/utils/axios";
const path = "/interactions";

export const useInteractionStore = defineStore("interactions", {
  state: () => ({
    interactions: [],
    currentInteraction: {},
  }),
  actions: {
    async interactionList() {
      try {
        const response = await UnsecureAxios.get(`${path}/list`);
        if (response.status === 200) {
          this.interactions = response.data;
        }
      } catch (err) {
        throw err;
      }
    },
    async interactionById(id) {
      const response = await UnsecureAxios.get(`${path}/list/${id}`);
      this.interactions = response.data.data;
      this.currentInteraction = response.data.data;
    },
    async addInteraction(interaction) {
      try {
        const response = await UnsecureAxios.post(`${path}`, interaction);
        console.log(response);
        if (response.status === 200) {
          this.interactionList();
        }
        return response;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
