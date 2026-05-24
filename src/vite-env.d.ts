/// <reference types="vite/client" />

interface ElectronAPI {
  moveWindow: (deltaX: number, deltaY: number) => void
  quitApp: () => void
}

interface Window {
  electronAPI?: ElectronAPI
}
