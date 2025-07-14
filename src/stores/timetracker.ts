import { defineStore, acceptHMRUpdate } from 'pinia';
export const useTimetrackerStore = defineStore('timetracker', {
  state: () => ({
    projectSelected: '',
    projectTaskSelected: '',
  }),

  getters: {
    projectSelectedId: (state) => state.projectSelected,
    projectTaskSelectedId: (state) => state.projectTaskSelected,
  },

  actions: {
    setProjectSelected(projectSelectedId = '') {
      this.projectSelected = projectSelectedId;
    },
    setProjectTaskSelected(projectTaskSelectedId = '') {
      this.projectTaskSelected = projectTaskSelectedId;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimetrackerStore, import.meta.hot));
}
