
import Phaser from 'phaser'

class FireBall extends Phaser.Physics.Matter.Sprite {
  constructor (scene, x, y, player) {
    super(scene.matter.world, x, y, 'fire', 0)
    if (!FireBall.animInitialize) {
      FireBall.setupAnim(scene)
    }
    this.setCircle(10, { label: 'fire' })
    this.setSensor(true)
    this.player = player
    this.hud = scene.scene.get('HUDScene')
    scene.add.existing(this)
    this.setUpCollision(scene)
  }

  setUpCollision (scene) {
    scene.matter.world.on('collisionstart', (event) => {
      const pairs = event.pairs
      this.destroyObject = false
      for (let i = 0; i < pairs.length; i++) {
        const body1 = pairs[i].bodyA
        const body2 = pairs[i].bodyB
        if (body1.label === 'fire' && body2.label === 'enemy') {
          if (body2.gameObject) {
            body2.gameObject.updateHp(1)
            if (body2.gameObject.stats.getHp() === 0) {
              body2.gameObject.enemyDieRespawn()
              this.player.setCurrentExp(2)
            }
          }
        } else if (body2.label === 'fire' && body1.label === 'enemy') {
          if (body1.gameObject) {
            body1.gameObject.updateHp(1)
            if (body1.gameObject.stats.getHp() === 0) {
              body1.gameObject.enemyDieRespawn()
              this.player.setCurrentExp(2)
            }
          }
        }
        if (this.destroyObject) {
          this.objectToDestroy.gameObject.destroy()
        }
      }
    }, this)
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
