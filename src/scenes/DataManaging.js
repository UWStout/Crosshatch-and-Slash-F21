import Phaser from 'phaser'

class DataManaging {
  constructor (hp, level, str, int, cha, gold) {
    this.HP = hp
    this.level = level
    this.STR = str
    this.INT = int
    this.CHA = cha
    this.gold = gold
  }

  setHp () {
    this.HP++
  }

  setStr () {
    this.STR++
  }

  setInt () {
    this.INT++
  }

  setChar () {
    this.CHA++
  }

  setGold (collectedGold) {
    this.gold += collectedGold
  }

  setLevel () {
    this.level++
  }
}

export default DataManaging
