const { contextBridge, ipcRenderer } = require('electron');

const gameChannels = ['game-check-process', 'game-running']
const helthChannels = ['get-health', 'set-health', 'lock-health']
const equippedItemQty = ['get-equipped-qty', 'set-equipped-qty', 'lock-equipped-qty']
const inventoryItem = ['get-iventory-item', 'get-iventory-item-choices',  'set-iventory-item']

const validChannels = [
  ...gameChannels, ...helthChannels, ...equippedItemQty,
  ...inventoryItem
];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    send(channel, data) {
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    invoke(channel, data) {
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, data);
      }
    },
    on(channel, func) {
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      if (validChannels.includes(channel)) {
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
