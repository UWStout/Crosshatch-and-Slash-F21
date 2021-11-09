import Phaser from 'phaser'

class EnemyStats extends Phaser.Data.DataManager {
  create () {
    this.dataManage = new this.DataManager()
    this.dataManage.setFreeze(false)
    this.dataManage.set({ name: '', HP: 5 })
  }

  setHp (hp) {
    this.dataManage.HP = hp
  }

  getHp () {
    return this.dataManage.HP
  }

  setName (name) {
    this.dataManage.name = name
  }

  getName() {
    return this.dataManage.name
  }
}

export default EnemyStats
