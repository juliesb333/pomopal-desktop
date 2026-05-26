import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  moveWindow: (deltaX: number, deltaY: number) => {
    ipcRenderer.send('window:move', { deltaX, deltaY })
  },
  setMouseEventsIgnored: (ignored: boolean) => {
    ipcRenderer.send('window:set-mouse-events-ignored', ignored)
  },
  quitApp: () => {
    ipcRenderer.send('app:quit')
  },
})
