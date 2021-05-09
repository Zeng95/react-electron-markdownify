const { app, powerSaveBlocker } = require('electron')
const _ = require('lodash')
const consola = require('consola')
const ElectronManager = require('./lib/ElectronManager')

const id = powerSaveBlocker.start('prevent-display-sleep')
consola.info(powerSaveBlocker.isStarted(id))
const cmdLineOptions = [
  '-disable-web-security',
  '--disable-pinch',
  '--disable-renderer-backgrounding',
  '--disable-background-timer-throttling',
  '--override-plugin-power-saver-for-testing=never',
  '--force_high_performance_gpu',
  '--ignore-connection-limit=dev.orchestration.mgto.ps-dev.cn,futuredns.com',
  '--disable-extensions-http-throttling',
  '--enable-accelerated-mjpeg-decode',
  '--enable-accelerated-video',
  '--ignore-gpu-blacklist',
  '--enable-native-gpu-memory-buffers',
  '--enable-gpu-rasterization',
  ['--autoplay-policy', 'no-user-gesture-required'],
  ['--disable-features', 'OutOfBlinkCors'],
  ['--high-dpi-support', 1],
  ['--force-device-scale-factor', 1],
  ['--js-flags', '--max-old-space-size=4096', '--use-largepages=mode=on']
]
_.forEach(cmdLineOptions, (option) => {
  if (_.isArray(option)) {
    app.commandLine.appendSwitch(...option)
  } else {
    app.commandLine.appendSwitch(option)
  }
})

ElectronManager.init()
