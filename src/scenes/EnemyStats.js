import Phaser from 'phaser'

class EnemyStats {
  constructor (hp, name) {
    this.HP = hp
    this.name = name
  }

  setHp (hp) {
    this.HP = hp
  }

  getHp () {
    return this.HP
  }

  getName () {
    return this.name
  }
}

export default EnemyStats
