
import Phaser from 'phaser'

class FireBall extends Phaser.Physics.Matter.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'fireball', 0)
    if (!FireBall.animInitialize) {
      FireBall.setupAnim(scene)
    }
    scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.setImmovable(true)
    this.body.setAllowGravity(false)
    this.body.setCollideWorldBounds(true)

    scene.add.existing(this)
  }
}

FireBall.animInitialize = false
FireBall.setupAnim = (scene) => {
  scene.anims.create({
    key: 'fireBall',
    frameRate: 12,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('fire', { start: 0, end: 5 })
  })
  FireBall.animInitialize = true
}
export default FireBall
