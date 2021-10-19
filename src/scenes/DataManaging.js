import Phaser from 'phaser'

class DataManaging extends Phaser.Data.DataManager {
  create () {
    this.dataManage = new this.DataManager()
    this.dataManage.setFreeze(false)
    this.dataManage.set({ name: 'Character', HP: '10', level: '1', STR: '1', INT: '1', CHA: '1', Gold: '0' })
  }

  setHp () {
    this.dataManage.HP++
  }

  setStr () {
    this.dataManage.STR++
  }

  setInt () {
    this.dataManage.INT++
  }

  setChar () {
    this.dataManage.CHA++
  }

  setGold (collectedGold) {
    this.dataManage.Gold += collectedGold
  }

  setLevel () {
    this.dataManage.level++
  }
}

export default DataManaging
