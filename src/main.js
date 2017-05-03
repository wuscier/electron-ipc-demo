const electron = require('electron')

const countdown = require('./countdown.js')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

const windows = []

app.on('ready', _=>
{
    [1,2,3].forEach(_=>{
        let win = new BrowserWindow({
            width:500,
            height:500
        })

        win.loadURL(`file://${__dirname}/countdown.html`)

        win.on('closed',_=>{
            win = null
        })

        windows.push(win)
    })

    ipc.on('countdown-start',_=>{
        countdown(count => {
            windows.forEach(win => {
                win.webContents.send('countdown',count)
            })
        })
    })
})

