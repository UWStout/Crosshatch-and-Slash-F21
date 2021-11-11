import Phaser from 'phaser'

class EnemyStats {
  constructor (hp, name) {
    this.HP = hp
    this.name = name
  }

  setHp (hp) {
    this.HP = hp
    this.name = name
  }

  getHp () {
    return this.HP
  }

  getName () {
    return this.name
  }
}

export default EnemyStats
