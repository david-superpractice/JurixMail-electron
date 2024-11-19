const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const { EmailProviderManager } = require('./providers');
const nodemailer = require('nodemailer');

// Initialize store with encryption
const store = new Store({
  encryptionKey: 'your-encryption-key',
  name: 'email-config'
});

const providerManager = new EmailProviderManager(store);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hiddenInset',
    vibrancy: 'under-window',
    visualEffectState: 'active'
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Email provider integration
  ipcMain.handle('email:connect-provider', async (event, { type, config }) => {
    try {
      switch (type) {
        case 'gmail':
          return await handleGmailAuth(mainWindow);
        case 'outlook':
          return await handleOutlookAuth(mainWindow);
        case 'smtp':
          return await handleSMTPConfig(config);
        default:
          throw new Error('Unsupported provider type');
      }
    } catch (error) {
      console.error('Failed to connect provider:', error);
      throw error;
    }
  });

  ipcMain.handle('email:disconnect-provider', async (event, accountId) => {
    await providerManager.removeAccount(accountId);
    return true;
  });

  ipcMain.handle('email:get-accounts', async () => {
    return await providerManager.getAccounts();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

async function handleGmailAuth(mainWindow) {
  // Implementation will be added in the next iteration
  return null;
}

async function handleOutlookAuth(mainWindow) {
  // Implementation will be added in the next iteration
  return null;
}

async function handleSMTPConfig(config) {
  try {
    const transporter = nodemailer.createTransport(config);
    await transporter.verify();
    
    return await providerManager.addAccount({
      type: 'smtp',
      email: config.username,
      name: config.username,
      provider: 'SMTP',
      config
    });
  } catch (error) {
    console.error('SMTP configuration failed:', error);
    throw new Error('Invalid SMTP configuration');
  }
}