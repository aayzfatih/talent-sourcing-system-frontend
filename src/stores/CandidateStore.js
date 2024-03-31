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
    async List({ page, size = 5, status }) {
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
        this.List({ page: this.currentPage + 1, status: status });
      }
    },
    prevPage(status) {
      if (this.$state.currentPage > 0) {
        this.List({ page: this.currentPage - 1, status: status });
      }
    },
    async addCandidate(candidate) {
      try {
        const response = await UnsecureAxios.post(`${path}`, candidate);
        if (response.status === 201) {
          this.List({ page: this.currentPage, status: this.status });
        }
        return response;
      } catch (err) {
        throw err;
      }
    },
    async deleteCandidate(id) {
      const response = await UnsecureAxios.delete(`${path}/${id}`)
        .then((res) =>
          this.List({ page: this.currentPage, status: this.status })
        )
        .catch((err) => console.log(err));
    },
    async updateCandidate(id, updatedCandidate) {
      UnsecureAxios.put(`${path}/${id}`, updatedCandidate)
        .then((res) => {
          this.List({ page: this.currentPage, status: this.status });
        })
        .catch((err) => console.log(err));
    },
    async updateStatusById(id, updatedStatus) {
      try {
        const response = await UnsecureAxios.put(`${path}/status/${id}`, {
          status: updatedStatus,
        });
        if (response.status === 200) {
          this.candidates[this.candidates.findIndex((c) => c.id === id)] = {
            ...this.candidates[this.candidates.findIndex((c) => c.id === id)],
            status: updatedStatus,
          };
        }
        return response;
      } catch (err) {
        throw err;
      }
    },

    async getStatus() {
      const response = await UnsecureAxios.get(`${path}/status`);
      this.status = response.data;
    },
  },
});
