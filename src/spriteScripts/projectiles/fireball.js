
import Phaser from 'phaser'

class FireBall extends Phaser.Physics.Matter.Sprite {
  constructor (scene, x, y, player) {
    super(scene.matter.world, x, y, 'fire', 0)

    if (!FireBall.animInitialize) {
      FireBall.setupAnim(scene)
    }
    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'burnout',
      () => {
        this.destroy()
      },
      this)

    this.setCircle(10, { label: 'fire' })
    this.setSensor(true)
    this.isPlayingBurnout = false
    this.player = player
    this.hud = scene.scene.get('HUDScene')
    scene.add.existing(this)
    this.setScale(0.5, 0.5)
    this.setUpCollision(scene)
  }

  getIsPlayingBurnout () {
    return this.isPlayingBurnout
  }

  setIsPlayingBurnout (newValue) {
    this.isPlayingBurnout = newValue
  }

  setUpCollision (scene) {
    scene.matter.world.on('collisionstart', (event) => {
      const pairs = event.pairs
      this.destroyObject = false

      for (let i = 0; i < pairs.length; i++) {
        const body1 = pairs[i].bodyA
        const body2 = pairs[i].bodyB

        if (body2.label === 'fire' && body1.label === 'enemyhitbox') {
          if (body1.gameObject) {
            body1.gameObject.updateHp(Phaser.Math.Between(1, 6))
            body2.gameObject.anims.play('burnout')
            this.setIsPlayingBurnout(true)
            if (body1.gameObject.stats.getHp() <= 0) {
              body1.gameObject.updateState('DYING')
              // this.scene.tweens.killTweensOf(body1.gameObject)

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
    frames: scene.anims.generateFrameNumbers('Fire', { start: 5, end: 10 })
  })
  scene.anims.create({
    key: 'burnout',
    frameRate: 12,
    repeat: 0,
    frames: scene.anims.generateFrameNumbers('Fire', { start: 11, end: 15 })
  })

  FireBall.animInitialize = true
}
export default FireBall
