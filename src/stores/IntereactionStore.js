import { defineStore } from "pinia";
import { UnsecureAxios } from "@/utils/axios";
const path = "/interactions";

export const useInteractionStore = defineStore("interactions", {
  state: () => ({
    interactions: [],
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
    async addInteraction(interaction) {
      try {
        const response = await UnsecureAxios.post(`${path}`, interaction);
        if (response.status === 200) {
          this.interactionList();
        }
        return response;
      } catch (err) {
        return err;
      }
    },
    async deleteInteraction(id) {
      try {
        const response = await UnsecureAxios.delete(`${path}/${id}`);
        if (response.status === 204) return response;
      } catch (err) {
        console.log(err);
      }
    },
    async updateInteraction(id, payload) {
      try {
        payload.updatedTime = new Date().toISOString();
        const response = await UnsecureAxios.put(`${path}/${id}`, payload);
        if (response.status === 200) return response;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
