const electron = require('electron')

const countdown = require('./countdown.js')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

let mainWindow

app.on('ready', _=>
{
    mainWindow = new BrowserWindow({
        width:800,
        height:600
    })

    mainWindow.loadURL(`file://${__dirname}/countdown.html`)

    mainWindow.on('closed',_=>{
        mainWindow = null
    })

    ipc.on('countdown-start',_=>{
        countdown(count=>{
            mainWindow.webContents.send('countdown',count)
        })
    })
})

