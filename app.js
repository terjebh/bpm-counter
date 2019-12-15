const electron = require('electron');
const { BrowserWindow } = require('electron');
const Menu = electron.Menu;

electron.app.on('ready', function() {
    mainWindow = new BrowserWindow({
        icon: __dirname + "/icon.ico",
        width: 200,
        height: 300,
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: true,
        frame: true,
        show: false,
        hide: true,
        fullscreenable: true,
        backgroundColor: '#000',
    })

    template = [
        {
        label: "File",
            submenu: [
                    {
                    label: "Quit",
                    click: function() {
                        electron.app.quit()
                    }
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.loadURL(`file://${__dirname}/bpmcounter.html`);
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    })
})