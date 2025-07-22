import { defineStore, acceptHMRUpdate } from 'pinia';
import type { ZohoTimelogSummary } from 'src/types/zoho-rest.type';

const zohoTimeSheet = {
  date: [],
  role: '',
  non_billable_hours: '',
  billable_hours: '',
  grandtotal: '',
};
const _timelogSummary: ZohoTimelogSummary = {
  daily: zohoTimeSheet,
  weekly: zohoTimeSheet,
};

export const useTimetrackerStore = defineStore('timetracker', {
  state: () => ({
    projectSelected: '',
    projectTaskSelected: '',
    customNotes: '',
    _timelogSummary,
  }),

  getters: {
    projectSelectedId: (state) => state.projectSelected,
    projectTaskSelectedId: (state) => state.projectTaskSelected,
    notes: (state) => state.customNotes,
    timelogSummary: (state): ZohoTimelogSummary => state._timelogSummary,
  },

  actions: {
    setProjectSelected(projectSelectedId = '') {
      this.projectSelected = projectSelectedId;
    },
    setProjectTaskSelected(projectTaskSelectedId = '') {
      this.projectTaskSelected = projectTaskSelectedId;
    },
    setNotes(notes = '') {
      this.customNotes = notes;
    },
    async fetchTimelogSummary() {
      this._timelogSummary = await window.electronAPI.getTimelogSummary();

      console.log(this._timelogSummary);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimetrackerStore, import.meta.hot));
}
