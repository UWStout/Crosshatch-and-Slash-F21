import Phaser from 'phaser'
import CONFIG from '../config'
import FireBall from './projectiles/fireball'

class PlayerClass extends Phaser.Physics.Matter.Sprite {
  constructor (scene, x, y) {
    super(scene.matter.world, x, y, 'playerWalkIdle', 0)

    this.canMove = true
    this.isAttacking = false
    if (!PlayerClass.animInitialize) {
      PlayerClass.setupAnim(scene)
    }
    // enabling physics on player
    // this.setImmovable(true)
    // this.body.setAllowGravity(false)
    // this.body.setCollideWorldBounds(true)
    // this.body.setSize(200, 200)
    const bodies = Phaser.Physics.Matter.Matter.Bodies
    const circleA = bodies.circle(50, -250, 120, { isSensor: true, label: 'combat' })
    const circleB = bodies.circle(0, 0, 100, { label: 'collide' })
    console.log(this.x + ' ' + this.y)
    console.log(circleA)
    console.log(circleB)
    const compoundBody = Phaser.Physics.Matter.Matter.Body.create({ parts: [circleA, circleB], inertia: Infinity })
    this.setExistingBody(compoundBody)
    this.setPosition(x, y)
    this.setOrigin(0.5, 0.6)
    this.setScale(0.6, 0.6)
    this.setBounce(0)
    this.setFixedRotation()
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
    this.isAttacking = true
    this.canMove = false
    this.anims.play('playerAttackPhysical', true)
    setTimeout(() => { this.isAttacking = false }, 1)
  }

  getIsAttacking () {
    return this.isAttacking
  }

  magicAttack (x, y) {
    this.canMove = false

    const endX = this.x + x
    const endY = this.y + y

    const projectile = new FireBall(this.scene, this.x, this.y)
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
