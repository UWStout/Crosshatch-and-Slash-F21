import Phaser from 'phaser'

class DataManaging {
  constructor (hp, level, str, int, cha, gold, exp) {
    this.HP = hp
    this.level = level
    this.STR = str
    this.INT = int
    this.CHA = cha
    this.gold = gold
    this.exp = exp
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

  setExp (exp) {
    this.exp += exp
  }

  getHp () {
    return this.HP
  }

  getGold () {
    return this.gold
  }

  getLevel () {
    return this.level
  }

  getExp () {
    return this.exp
  }
}

export default DataManaging
