const { app, BrowserWindow, protocol } = require('electron')
const { success, error } = require('consola')
const Q = require('q')
const localshortcut = require('electron-localshortcut')
const colors = require('colors')
const autoBind = require('auto-bind')
const isDevelopment = require('electron-is-dev')

class ElectronManager {
  constructor() {
    autoBind(this)
    this.win = null
  }

  init() {
    // Scheme must be registered before the app is ready
    protocol.registerSchemesAsPrivileged([
      { scheme: 'app', privileges: { secure: true, standard: true } }
    ])

    app.whenReady().then(this.onReady)
    app.on('window-all-closed', this.closeAllWindows)

    // Exit cleanly on request from parent process in development mode.
    if (isDevelopment) {
      if (process.platform === 'win32') {
        process.on('message', (data) => {
          if (data === 'graceful-exit') {
            app.quit()
          }
        })
      } else {
        process.on('SIGTERM', () => {
          app.quit()
        })
      }
    }
  }

  onReady() {
    Q.fcall(() => {
      this.win = this.createWindow()
      this.createShortcuts()
    })
      .catch((e) => {
        this.handleError('The app failed to initialize properly:', e)
      })
      .done(() => {
        success(colors.brightGreen('Initialize Electron app successfully'))
      })
  }

  loadApp(win) {
    try {
      const urlLocation = isDevelopment ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`
      win.loadURL(urlLocation)
      win.focus()
    } catch (e) {
      this.handleError('The app failed to initialize properly:', e)
    }
  }

  createWindow() {
    // Create a browser window.
    let win = new BrowserWindow({
      width: 1024,
      height: 680,
      webPreferences: {
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      }
    })

    win.on('closed', () => {
      win = null
    })

    try {
      this.loadApp(win)
    } catch (e) {
      this.handleError('The app failed to initialize properly:', e)
    }

    return win
  }

  createShortcuts() {
    localshortcut.register('Q', this.closeAllWindows)
    localshortcut.register('R', this.reloadAllWindows)
    localshortcut.register('D', this.toggleDevTools)
    localshortcut.register('F', this.toggleFullscreen)
  }

  closeAllWindows() {
    app.quit()
  }

  reloadAllWindows() {
    this.loadApp(this.win)
  }

  toggleDevTools() {
    this.win.webContents.toggleDevTools()
  }

  toggleFullscreen() {
    const isFullScreen = this.win.isFullScreen()
    this.win.setFullScreen(!isFullScreen)
  }

  handleError(message, e) {
    error(message, e)
  }
}

module.exports = new ElectronManager()