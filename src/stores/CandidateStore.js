import { defineStore } from "pinia";
import { UnsecureAxios } from "@/utils/axios";
const path = "/candidates";
export const useCandidateStore = defineStore("candidates ", {
  state: () => ({
    candidates: [],
    selectedCandidate: {},
    totalPages: 0,
    currentPage: 0,
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
    nextPage() {
      if (this.$state.currentPage < this.$state.totalPages - 1) {
        this.List(this.currentPage + 1, 3);
      }
    },
    prevPage() {
      if (this.$state.currentPage > 0) {
        this.List(this.currentPage - 1, 3);
      }
    },
    async addCandidate(candidate) {
      this.candidates.push(candidate);
      const response = await UnsecureAxios.post(`${path}`, candidate)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
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
      // Veritabanını güncelle
      const response = await UnsecureAxios.put(
        `${path}/${id}`,
        updatedCandidate
      );
      console.log(this.candidates);
      // Veritabanı güncelleme başarılı olduysa yerel aday listesini güncelle
      if (response.status === 200) {
        this.candidates = this.candidates.map((c) => {
          if (c.id === id) {
            return { ...c, ...updatedCandidate };
          }
          return c;
        });
      }
    },
    async getStatus() {
      const response = await UnsecureAxios.get(`${path}/status`);
      this.status = response.data;
    },
  },
});
