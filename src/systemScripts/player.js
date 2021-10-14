import Phaser from 'phaser'

class PlayerClass extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'playerIdleWalk', 0)

    if(!PlayerClass.animInitialize)
    {
      PlayerClass.setupAnim(scene)
    }

    // enabling physics on player
    scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.setImmovable(true)
    this.body.setAllowGravity(false)
    this.body.setCollideWorldBounds(true)

    scene.add.existing(this)
  }
}

PlayerClass.animInitialize = false
PlayerClass.setupAnim = (scene) => {
  scene.anims.create({
    key: 'playerIdleWalk',
    frameRate: 8,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('playerWalk', { start: 0, end: 7 })
  })
}
export default PlayerClass
