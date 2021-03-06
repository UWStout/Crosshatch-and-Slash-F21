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

  setInt (intToChange) {
    this.INT += intToChange
  }

  setChar () {
    this.CHA++
  }

  setGold (collectedGold) {
    this.gold += collectedGold
  }

  addLevel () {
    this.level++
  }

  setExp (exp) {
    this.exp += exp
  }

  getHp () {
    return this.HP
  }

  getStr () {
    return this.STR
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

  getInt () {
    return this.INT
  }
}

export default DataManaging
