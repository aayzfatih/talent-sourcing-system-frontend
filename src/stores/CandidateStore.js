import { defineStore } from "pinia";
import { UnsecureAxios } from "@/utils/axios";
const path = "/candidates";
export const useCandidateStore = defineStore("candidates ", {
  state: () => ({
    candidates: [],
    totalPages: 0,
    currentPage: 0,
    status: [],
  }),
  getters: {},
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
    nextPage() {
      if (this.$state.currentPage < this.$state.totalPages - 1) {
        this.List(this.currentPage + 1, 2);
      }
    },
    prevPage() {
      if (this.$state.currentPage > 0) {
        this.List(this.currentPage - 1, 2);
      }
    },
    async addCandidate(candidate) {
      this.candidates.push(candidate);
      const response = await fetch("http://localhost:8080/api/candidates/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidate),
      });
      if (response.error) {
        console.log(response.error);
      }
    },
    async deleteCandidate(id) {
      this.candidates = this.candidates.filter(
        (candidate) => candidate.id !== id
      );
      const response = await fetch(
        "http://localhost:8080/api/candidates/" + id,
        { method: "DELETE" }
      );
      if (response.error) {
        console.log(response.error);
      }
    },
    async getStatus() {
      const response = await fetch(
        "http://localhost:3000/api/v1/candidates/status"
      );
      if (response.error) {
        console.log(response.error);
      }
      const data = await response.json();
      this.status = data;
    },
  },
});
