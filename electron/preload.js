const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  auth: {
    login: () => ipcRenderer.invoke('auth:login'),
    logout: () => ipcRenderer.invoke('auth:logout'),
    connectEmailProvider: (type) => ipcRenderer.invoke('email:connect-provider', type),
    disconnectEmailProvider: (accountId) => ipcRenderer.invoke('email:disconnect-provider', accountId)
  },
  ai: {
    generateResponse: (prompt) => ipcRenderer.invoke('ai:generate-response', prompt)
  },
  store: {
    get: (key) => ipcRenderer.invoke('store:get', key),
    set: (key, value) => ipcRenderer.invoke('store:set', key, value)
  },
  email: {
    fetchEmails: (accountId) => ipcRenderer.invoke('email:fetch', accountId),
    sendEmail: (accountId, options) => ipcRenderer.invoke('email:send', accountId, options)
  }
});