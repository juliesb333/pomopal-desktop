import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  moveWindow: (deltaX: number, deltaY: number) => {
    ipcRenderer.send('window:move', { deltaX, deltaY })
  },
  quitApp: () => {
    ipcRenderer.send('app:quit')
  },
})
