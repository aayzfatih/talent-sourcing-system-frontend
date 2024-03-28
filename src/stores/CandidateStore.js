import { defineStore } from "pinia";

export const useCandidateStore = defineStore("candidates ", {
  state: () => ({
    candidates: [],
    isLoading: false,
  }),
  getters: {
    getSourcedCandidates: (state) => {
      return state.candidates.filter((candidate) => candidate.status === 2);
    },
  },

  actions: {
    async getAllCandidates() {
      this.isLoading = true;
      const response = await fetch("http://localhost:8080/api/candidates");
      const data = await response.json();
      this.candidates = data;
      this.isLoading = false;
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
      await axios
        .delete("http://localhost:8080/api/candidates/" + id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
  },
});
