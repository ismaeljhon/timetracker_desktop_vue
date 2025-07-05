import { defineStore, acceptHMRUpdate } from 'pinia';

export const useTimerStore = defineStore('timer', {
  state: () => ({
    timerRunning: false,
  }),

  getters: {
    isTimerRunning: (state) => state.timerRunning,
  },

  actions: {
    startTimer() {
      this.timerRunning = true;
    },
    stopTimer() {
      this.timerRunning = false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimerStore, import.meta.hot));
}
