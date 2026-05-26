/// <reference types="vite/client" />

interface ElectronAPI {
  moveWindow: (deltaX: number, deltaY: number) => void
  setMouseEventsIgnored: (ignored: boolean) => void
  quitApp: () => void
}

interface Window {
  electronAPI?: ElectronAPI
}
