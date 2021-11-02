
import Phaser from 'phaser'

class FireBall extends Phaser.Physics.Matter.Sprite {
  constructor (scene, x, y) {
    super(scene.matter.world, x, y, 'fireball', 0)
    if (!FireBall.animInitialize) {
      FireBall.setupAnim(scene)
    }
    this.scene.matter.world.disableGravity()
    scene.add.existing(this)
  }
}

FireBall.animInitialize = false
FireBall.setupAnim = (scene) => {
  scene.anims.create({
    key: 'fireBall',
    frameRate: 12,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('fire', { start: 0, end: 3 })
  })
  FireBall.animInitialize = true
}
export default FireBall
