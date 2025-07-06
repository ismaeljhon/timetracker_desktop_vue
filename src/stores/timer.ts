import { defineStore, acceptHMRUpdate } from 'pinia';

export const useTimerStore = defineStore('timer', {
  state: () => ({
    timerRunning: false,
    totalSeconds: 0,
    timerId: 0,
  }),

  getters: {
    isTimerRunning: (state) => state.timerRunning,
  },

  actions: {
    startTimer() {
      if (this.timerRunning) return;

      this.timerRunning = true;
      this.timerId = window.setInterval(() => {
        this.totalSeconds++;
      }, 1000);
    },
    stopTimer() {
      if (this.timerId !== null) {
        clearInterval(this.timerId);
        this.timerId = 0;
        this.timerRunning = false;
        this.totalSeconds = 0;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimerStore, import.meta.hot));
}
