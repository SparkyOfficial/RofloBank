const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // User data methods
  getUserData: () => ipcRenderer.invoke('get-user-data'),
  
  // Project purchase methods
  purchaseProject: (projectData) => ipcRenderer.invoke('purchase-project', projectData),
  
  // Menu event listeners
  onNewTransaction: (callback) => ipcRenderer.on('new-transaction', callback),
  onShowAbout: (callback) => ipcRenderer.on('show-about', callback),
  
  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});