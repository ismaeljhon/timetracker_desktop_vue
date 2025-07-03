export {}

declare global {
  interface Window {
    electronAPI: {
      takeScreenshot: () => Promise<string>
    }
  }
}
