import { defineStore } from "pinia";
import { UnsecureAxios } from "@/utils/axios";
const path = "/candidates";
export const useCandidateStore = defineStore("candidates ", {
  state: () => ({
    candidates: [],
    selectedCandidate: {},
    totalPages: 0,
    currentPage: 3,
    status: [],
  }),
  actions: {
    async List(page, size, status) {
      const response = await UnsecureAxios.get(
        `${path}/list?page=${page}&size=${size}${
          status ? `&status=${status}` : ""
        }`
      );
      this.candidates = response.data.data.content;
      this.$patch({ totalPages: response.data.data.totalPages });
      this.$patch({ currentPage: response.data.data.pageNo });
    },
    async getCandidateById(id) {
      const response = await UnsecureAxios.get(`${path}/list/${id}`);
      this.selectedCandidate = response.data.data;
    },
    nextPage(status) {
      if (this.$state.currentPage < this.$state.totalPages - 1) {
        this.List(this.currentPage + 1, 3, status);
      }
    },
    prevPage(status) {
      if (this.$state.currentPage > 0) {
        this.List(this.currentPage - 1, 3, status);
      }
    },
    async addCandidate(candidate) {
      try {
        const response = await UnsecureAxios.post(`${path}`, candidate);
        if (response.status === 201) {
          this.List(this.currentPage, 3, "");
        }

        return response;
      } catch (err) {
        console.log(err);
        return err; // If needed, you can return the error object
      }
    },
    async deleteCandidate(id) {
      this.candidates = this.candidates.filter(
        (candidate) => candidate.id !== id
      );
      const response = await UnsecureAxios.delete(`${path}/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    async updateCandidate(id, updatedCandidate) {
      const response = await UnsecureAxios.put(
        `${path}/${id}`,
        updatedCandidate
      );
      console.log(this.candidates);
      if (response.status === 200) {
        this.candidates = this.candidates.map((c) => {
          if (c.id === id) {
            return { ...c, ...updatedCandidate };
          }
          return c;
        });
      }
    },
    async updateStatusById(id, updatedStatus) {
      this.candidates.map((candidate) => {
        if (candidate.id === id) {
          return { ...candidate, status: updatedStatus };
        }
        return candidate;
      });
      const response = await UnsecureAxios.put(`${path}/status/${id}`, {
        status: updatedStatus,
      });
      console.log(this.candidates);
      console.log(response.data);
    },

    async getStatus() {
      const response = await UnsecureAxios.get(`${path}/status`);
      this.status = response.data;
    },
  },
});
