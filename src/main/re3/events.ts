import { ipcMain } from 'electron';
import RE3Hack, { iventoryItemChoices, IsetIventoryItem } from './hack';

const gameHack = new RE3Hack()

ipcMain.on('game-check-process', async (event, arg) => {
  gameHack.openProcess();
  event.reply('game-running', gameHack.gameRunning());
});

ipcMain.on('game-running', async (event, arg) => {
  event.reply('game-running', gameHack.gameRunning());
});

//////
// Health
////
ipcMain.handle('get-health', async (event, arg) => {
  return gameHack.getHealth()
});

ipcMain.on('set-health', async (event, arg: number) => {
  gameHack.setHealth(arg)
});

ipcMain.on('lock-health', async (event, arg: boolean) => {
  gameHack.lockHealth(arg)
});

//////
// Item Equipped Qty
////
ipcMain.handle('get-equipped-qty', async (event, arg) => {
  return gameHack.getEquippedItemQty()
});

ipcMain.on('set-equipped-qty', async (event, arg: number) => {
  gameHack.setEquippedItemQty(arg)
});

ipcMain.on('lock-equipped-qty', async (event, arg: boolean) => {
  gameHack.lockEquippedItemQty(arg)
});


//////
// Iventory Item
////
ipcMain.handle('get-iventory-item', async (event, arg: number) => {
  return gameHack.getIventoryItem({position: arg})
});

ipcMain.handle('get-iventory-item-choices', async (event, arg: number) => {
  return iventoryItemChoices
});

ipcMain.on('set-iventory-item', async (event, arg: IsetIventoryItem) => {
  gameHack.setIventoryItem(arg)
});
