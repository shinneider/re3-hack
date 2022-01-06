const memoryjs = require('memoryjs');

export const iventoryItemChoices = {
  1: 'Pistol G19',
  2: 'Pistol G18 (Burst Mode)',
  3: 'Pistol G18',
  4: 'Pistol Samurai Edge',
  7: 'Pistol MUP Infinite',
  11: 'Shotgun M3',
  21: 'Rifle CQBR',
  22: 'Rifle CQBR Infinite',
  31: '.44 AE Lightning Hawk (Magnun)',
  32: 'RAI-DEN',
  42: 'Grenade Launcher MGL',
  46: 'Combat Knife',
  47: 'Survival Knife',
  48: 'Hot Dogger',
  49: 'Rocket Launcher Infinite'
}

export interface IreadOffset {
  baseAddrr: any;
  offsets: any;
}

export interface IiventoryPosition {
  position: number
}

export interface IsetIventoryItem extends IiventoryPosition {
  item: 1 | 2 | 3 | 4 | 7 | 11 | 21 | 22 | 31 | 32 | 42 | 46 | 47 | 48 | 49
}

export interface IsetIventoryQty extends IiventoryPosition {
  qty: number
}

export default class RE3Hack {
  proccess: any = null;
  baseAddr: any = null

  constructor() {
    this.openProcess();
  }

  readOffsets(props: IreadOffset) {
    let basepoint = memoryjs.readMemory(this.proccess.handle, props.baseAddrr, 'int64');
    for (let offset of props.offsets.slice(0, -1)) {
      basepoint = memoryjs.readMemory(this.proccess.handle, basepoint + offset, 'int64');
    };

    return basepoint + props.offsets.slice(-1)[0]
  }

  openProcess() {
    try {
      this.proccess = memoryjs.openProcess('re3.exe');
      this.baseAddr = this.proccess['modBaseAddr']
    } catch {}
  }

  gameRunning() {
    return this.proccess !== null
  }

  //////
  // Health
  ////
  getHealthAddr() {
    const baseAddrr = this.baseAddr + 0x08CE6780;
    const offsets = [0x168, 0x70, 0x298, 0x10, 0x0, 0x20, 0x58]
    return this.readOffsets({baseAddrr, offsets})
  }

  getHealth() {
    const addr = this.getHealthAddr()
    return memoryjs.readMemory(this.proccess.handle, addr, 'int');
  }

  setHealth(qty: number) {
    const addr = this.getHealthAddr()
    memoryjs.writeMemory(this.proccess.handle, addr, qty, 'int');
  }

  healthInterval: any = null
  lockHealth(enabled: boolean) {
    if(enabled) {
      const health = this.getHealth();
      this.healthInterval = setInterval(() => this.setHealth(health), 400);
    } else {
      if(this.healthInterval !== null) clearInterval(this.healthInterval)
    }
  }

  //////
  // Equipped Weapon
  ////
  getEquippedItemQtyAddr() {
    const baseAddrr = this.baseAddr + 0x08D85BA0;
    const offsets = [0xC0, 0x38, 0x10, 0x20, 0x18, 0x10, 0x130]
    return this.readOffsets({baseAddrr, offsets})
  }

  getEquippedItemQty() {
    const addr = this.getEquippedItemQtyAddr()
    return memoryjs.readMemory(this.proccess.handle, addr, 'int');
  }

  setEquippedItemQty(qty: number) {
    const addr = this.getEquippedItemQtyAddr()
    return memoryjs.writeMemory(this.proccess.handle, addr, qty, 'int');
  }

  equippedItemQtyInterval: any = null
  lockEquippedItemQty(enabled: boolean) {
    if(enabled) {
      const ammo = this.getEquippedItemQty();
      this.equippedItemQtyInterval = setInterval(() => this.setEquippedItemQty(ammo), 700);
    } else {
      if(this.equippedItemQtyInterval !== null) clearInterval(this.equippedItemQtyInterval)
    }
  }

  //////
  // Iventory Item
  ////
  getIventoryItemAddr(props: IiventoryPosition): number {
    const addrs: {[index: number]: [number, number[]]} = {
        1: [0x08DB1EA8, [0x88, 0x20, 0x128, 0x90, 0x20, 0x18, 0x64]],
    }
    return this.readOffsets({baseAddrr: this.baseAddr + addrs[props.position][0], offsets: addrs[props.position][1]})
  }

  getIventoryItem(props: IiventoryPosition) {
    const addr = this.getIventoryItemAddr(props)
    return memoryjs.readMemory(this.proccess.handle, addr, 'int');
  }

  setIventoryItem(props: IsetIventoryItem) {
    const addr = this.getIventoryItemAddr({position: props.position})
    return memoryjs.writeMemory(this.proccess.handle, addr, props.item, 'int');
  }

  //////
  // Iventory QTY
  ////
  getIventoryQtyAddr(props: IiventoryPosition): number {
    const addrs: {[index: number]: [number, number[]]} = {
        1: [0x08DB1EA8, [0x88, 0x308, 0x50, 0x58, 0x10, 0x20]],
        2: [0x08D80560, [0x18, 0x50, 0x2B8, 0x98, 0xC0, 0x18, 0x140]]
    }
    return this.readOffsets({baseAddrr: this.baseAddr + addrs[props.position][0], offsets: addrs[props.position][1]})
  }

  getIventoryQty(props: IiventoryPosition) {
    const addr = this.getIventoryQtyAddr(props)
    return memoryjs.readMemory(this.proccess.handle, addr, 'int');
  }

  setIventoryQty(props: IsetIventoryQty) {
    const addr = this.getIventoryQtyAddr({position: props.position})
    return memoryjs.writeMemory(this.proccess.handle, addr, props.qty, 'int');
  }
}
