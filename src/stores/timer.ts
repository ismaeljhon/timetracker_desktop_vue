import { defineStore, acceptHMRUpdate } from 'pinia';
import { format } from 'quasar';
import { useScreenshotStore } from './screenshot';

const { pad } = format;

export const useTimerStore = defineStore('timer', {
  state: () => ({
    timerRunning: false,
    totalSeconds: 0,
    timerId: 0,
    screenshotInterval: 0,
  }),

  getters: {
    isTimerRunning: (state) => state.timerRunning,
    formattedTime: (state) => {
      const hours = Math.floor(state.totalSeconds / 3600);
      const minutes = Math.floor((state.totalSeconds % 3600) / 60);
      const seconds = state.totalSeconds % 60;
      return `${pad(hours.toString())}:${pad(minutes.toString())}:${pad(seconds.toString())}`;
    },
  },

  actions: {
    startTimer() {
      if (this.timerRunning) return;

      const screenshot = useScreenshotStore();

      this.timerRunning = true;
      this.timerId = window.setInterval(() => {
        this.totalSeconds++;
      }, 1000);

      this.screenshotInterval = window.setInterval(() => {
        screenshot.takeScreenshot().catch((e) => console.log(e));
      }, 1000000);
    },
    stopTimer() {
      if (this.timerId !== null) {
        clearInterval(this.timerId);
        clearInterval(this.screenshotInterval);
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
