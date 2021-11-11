
import Phaser from 'phaser'
import EnemyStats from '../scenes/EnemyStats'

class RatEnemy extends Phaser.Physics.Matter.Sprite {
  constructor (scene, x, y) {
    super(scene.matter.world, x, y, 'rat', 0)
    if (!RatEnemy.animInitialize) {
      RatEnemy.setupAnim(scene)
    }
    // this.stats.setHp(5)
    // this.stats.setName('Rat')
    this.setRectangle(70, 250, { label: 'enemy' })
    this.setBounce(0)
    this.setFixedRotation()
    this.setFrictionAir(1)
    this.setIgnoreGravity(false)
    scene.add.existing(this)
  }
}
// function getHP() {
//   return this.stats.getHP()
// }
// function setHP(hp) {
//   this.stats.setHP(hp)
// }

// function getName () {
//   return this.stats.getName()
// }
RatEnemy.animInitialize = false
RatEnemy.setupAnim = (scene) => {
  scene.anims.create({
    key: 'ratWalk',
    frameRate: 12,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('rat', { start: 0, end: 8 })
  })
  scene.anims.create({
    key: 'ratAttack',
    frameRate: 12,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('rat', { start: 9, end: 13 })
  })
  RatEnemy.animInitialize = true
}

export default RatEnemy
