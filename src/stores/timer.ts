import { defineStore, acceptHMRUpdate } from 'pinia';
import { pad } from 'src/shared/utils';

export const useTimerStore = defineStore('timer', {
  state: () => ({
    timerRunning: false,
    totalSeconds: 0,
    timerId: 0,
  }),

  getters: {
    isTimerRunning: (state) => state.timerRunning,
    formattedTime: (state) => {
      const hours = Math.floor(state.totalSeconds / 3600);
      const minutes = Math.floor((state.totalSeconds % 3600) / 60);
      const seconds = state.totalSeconds % 60;
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    },
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
