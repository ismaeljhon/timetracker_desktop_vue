import { defineStore } from 'pinia';
import { format } from 'quasar';
import { useScreenshotStore } from '../screenshot';

const { pad } = format;

export const useTimerStore = defineStore('timer', {
  state: () => ({
    _timerRunning: false,
    _startTime: 0,
    _elapsedSeconds: 0,
    _timerInterval: 0,
    _screenshotInterval: 0,
  }),

  getters: {
    isTimerRunning: (state) => state._timerRunning,
    formattedTime: (state) => {
      const hours = Math.floor(state._elapsedSeconds / 3600);
      const minutes = Math.floor((state._elapsedSeconds % 3600) / 60);
      const seconds = state._elapsedSeconds % 60;
      return `${pad(hours.toString())}:${pad(minutes.toString())}:${pad(seconds.toString())}`;
    },
  },

  actions: {
    startTimer() {
      this._timerRunning = true;
      this._startTime = Date.now();
      this._timerInterval = window.setInterval(() => {
        const now = Date.now();
        this._elapsedSeconds = Math.floor((now - this._startTime) / 1000);
      }, 1000);

      const screenshot = useScreenshotStore();
      screenshot.takeScreenshot().catch((e) => console.log(e));

      this._screenshotInterval = window.setInterval(() => {
        screenshot.takeScreenshot().catch((e) => console.log(e));
      }, 300000);
    },
    stopTimer() {
      if (this._timerInterval) {
        clearInterval(this._timerInterval);
        clearInterval(this._screenshotInterval);

        this._elapsedSeconds = 0;
        this._timerRunning = false;
      }
    },
  },
});
