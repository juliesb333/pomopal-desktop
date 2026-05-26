import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

const isDev = !app.isPackaged
const isMac = process.platform === 'darwin'

/** Compact bounds — only enough space for the tomato, timer, and tiny menu */
const WINDOW_WIDTH = 180
const WINDOW_HEIGHT = 160

interface MoveWindowPayload {
  deltaX: number
  deltaY: number
}

function isMoveWindowPayload(value: unknown): value is MoveWindowPayload {
  if (!value || typeof value !== 'object') return false

  const payload = value as MoveWindowPayload
  return Number.isFinite(payload.deltaX) && Number.isFinite(payload.deltaY)
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    minWidth: WINDOW_WIDTH,
    maxWidth: WINDOW_WIDTH,
    minHeight: WINDOW_HEIGHT,
    maxHeight: WINDOW_HEIGHT,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    alwaysOnTop: true,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    minimizable: false,
    hasShadow: false,
    thickFrame: false,
    show: false,
    ...(isMac
      ? {
          // Floating widget-style window: no title bar, no traffic lights, no rounded chrome
          roundedCorners: false,
          hiddenInMissionControl: true,
          acceptFirstMouse: true,
          skipTaskbar: true,
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
    },
  })

  mainWindow.setBackgroundColor('#00000000')
  mainWindow.setHasShadow(false)
  mainWindow.setIgnoreMouseEvents(true, { forward: true })

  if (isMac) {
    mainWindow.setAlwaysOnTop(true, 'floating')
    mainWindow.setVisibleOnAllWorkspaces(true)
    mainWindow.setWindowButtonVisibility(false)
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

ipcMain.on('window:move', (event, payload: unknown) => {
  if (!isMoveWindowPayload(payload)) return

  const window = BrowserWindow.fromWebContents(event.sender)
  if (!window) return

  const { x, y } = window.getBounds()
  window.setPosition(
    Math.round(x + payload.deltaX),
    Math.round(y + payload.deltaY),
    false,
  )
})

ipcMain.on('window:set-mouse-events-ignored', (event, ignored: unknown) => {
  if (typeof ignored !== 'boolean') return

  const window = BrowserWindow.fromWebContents(event.sender)
  if (!window) return

  window.setIgnoreMouseEvents(ignored, ignored ? { forward: true } : undefined)
})

ipcMain.on('app:quit', () => {
  app.quit()
})

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
