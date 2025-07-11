import { defineStore, acceptHMRUpdate } from 'pinia';
export const useScreenshotStore = defineStore('screenshot', {
  state: () => ({
    latestScreenshotPath: '',
  }),

  getters: {
    latestScreenshot: (state) => state.latestScreenshotPath,
  },

  actions: {
    async takeScreenshot() {
      await window.electronAPI.takeScreenshot();
      this.latestScreenshotPath = await window.electronAPI.getLatestScreenshot();
    },
    async fetchLatestScreenshot() {
      this.latestScreenshotPath = await window.electronAPI.getLatestScreenshot();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScreenshotStore, import.meta.hot));
}
