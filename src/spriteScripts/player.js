import Phaser from 'phaser'
import CONFIG from '../config'
import FireBall from './projectiles/fireball'

class PlayerClass extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'playerWalkIdle', 0)

    this.canMove = true

    if (!PlayerClass.animInitialize) {
      PlayerClass.setupAnim(scene)
    }

    // enabling physics on player
    scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.setImmovable(true)
    this.body.setAllowGravity(false)
    this.body.setCollideWorldBounds(true)

    this.setScale(0.25, 0.25)
    this.anims.play('playerIdle')

    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'playerAttackPhysical',
      () => {
        this.anims.play('playerIdle')
        this.canMove = true
      },
      this)
    // this.on(
    //   Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'playerAttackMagical',
    //   () => {
    //     this.anims.play('playerIdle')
    //     this.canMove = true
    //   },
    //   this)

    scene.add.existing(this)
  }

  attack () { 
    this.canMove = false
    this.anims.play('playerAttackPhysical', true)
  }

  magicAttack (x, y) {
    this.canMove = false

    const endX = this.x + x
    const endY = this.y + y

    const projectile = new FireBall(this.scene, this.x, this.y )
    const newTween = this.scene.tweens.add({
      targets: projectile,
      x: endX,
      y: endY,
      ease: 'Power1',
      duration: 250
    })

    newTween.on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
      setTimeout(() => { projectile.destroy() }, 0)
    })
    console.log('Magic Attack')
  }

  move (x, y) {
    if (this.canMove) {
      if (Math.abs(x) > 0 || Math.abs(y) > 0) {
        this.anims.play('playerWalk', true)
      } else {
        this.anims.play('playerIdle', true)
      }
      this.setVelocity(x * CONFIG.WALK_SPEED, y * CONFIG.WALK_SPEED)
    } else {
      this.setVelocity(0, 0)
    }
  }
}

PlayerClass.animInitialize = false
PlayerClass.setupAnim = (scene) => {
  scene.anims.create({
    key: 'playerWalk',
    frameRate: 8,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('playerWalkIdle', { start: 0, end: 7 })
  })

  scene.anims.create({
    key: 'playerIdle',
    frameRate: 8,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('playerWalkIdle', { start: 8, end: 11 })
  })

  scene.anims.create({
    key: 'playerAttackPhysical',
    frameRate: 8,
    repeat: 0,
    frames: scene.anims.generateFrameNumbers('playerAttack', { start: 0, end: 4 })
  })
}

export default PlayerClass
