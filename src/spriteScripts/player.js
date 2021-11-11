import Phaser from 'phaser'
import CONFIG from '../config'
import DataManaging from '../scenes/DataManaging'
import FireBall from './projectiles/fireball'

class PlayerClass extends Phaser.Physics.Matter.Sprite {
  constructor (scene, x, y) {
    super(scene.matter.world, x, y, 'playerWalkIdle', 0)
    this.canMove = true
    this.dataManaging = new DataManaging(20, 1, 1, 10, 1, 0)
    this.isAttacking = false
    if (!PlayerClass.animInitialize) {
      PlayerClass.setupAnim(scene)
    }
    this.setScale(0.6, 0.6)
    const bodies = Phaser.Physics.Matter.Matter.Bodies
    const circleA = bodies.circle(x+20, y-120, 120, { isSensor: true, label: 'hitbox' })
    const circleB = bodies.circle(x, y, 100, { label: 'player' })
    const compoundBody = Phaser.Physics.Matter.Matter.Body.create({ parts: [circleB, circleA] })
    compoundBody.restitution = 0
    this.setExistingBody(compoundBody)
    this.setOrigin(0.5, 0.6)
    this.setFixedRotation()
    this.setPosition(x, y)
    // const swordSensor = Phaser.Physics.Matter.Factory.circle(x, y-20, 70, { isSensor: true })
    this.anims.play('playerIdle')

    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'playerAttackPhysical',
      () => {
        this.anims.play('playerIdle')
        this.canMove = true
      },
      this)
    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'playerAttackMagical',
      () => {
        this.anims.play('playerIdle')
        this.canMove = true
      },
      this)

    scene.add.existing(this)
    this.setUpCollision(scene)
  }

  setUpCollision (scene) {
    this.playerSprite = null
    this.colliderSprite = null
    this.playerBody = null
    this.colliderBody = null

    this.overlapping = new Set()
    this.isInEnemy = false
    scene.matter.world.on('collisionstart', (event) => {
      const pairs = event.pairs
      for (let i = 0; i < pairs.length; i++) {
        const body1 = pairs[i].bodyA
        const body2 = pairs[i].bodyB
        if ((body1.label === 'hitbox' || body1.label === 'fire') && body2.label === 'enemy') {
          this.overlapping.add(body2)
          this.isInEnemy = true
        }
        if ((body2.label === 'hitbox' || body2.label === 'fire') && body1.label === 'enemy') {
          this.overlapping.add(body1)
          this.isInEnemy = true
        }
      }
      // console.log('Collision Start', this.overlapping)
    }, this)

    scene.matter.world.on('collisionend', (event) => {
      const pairs = event.pairs
      for (let i = 0; i < pairs.length; i++) {
        const body1 = pairs[i].bodyA
        const body2 = pairs[i].bodyB
        if (this.overlapping.has(body1)) {
          this.overlapping.delete(body1)
          this.isInEnemy = false
        }

        if (this.overlapping.has(body2)) {
          this.overlapping.delete(body2)
          this.isInEnemy = false
        }
      }
      // console.log('Collision End', this.overlapping)
    }, this)
    // scene.matter.world.on('collisionactive', function () {
    //   if (this.playerSprite && this.colliderSprite) {
    //     console.log('E')
    //     if (this.colliderBody && this.playerBody) {
    //       if (this.colliderBody.label === 'rat' && this.playerBody.label === 'combat') {
    //         if (this.player.getIsAttacking()) {
    //           console.log('hit enemy')
    //         }
    //       }
    //     }
    //   }
    // })
  }

  attack () {
    this.canMove = false
    this.anims.play('playerAttackPhysical', true)
    this.overlapping.forEach((body) => {
      if (body.gameObject) {
        console.log('Hit', body.gameObject)
        body.gameObject.updateHp()
        if (body.gameObject.stats.getHp() <= 0) {
          body.gameObject.destroy()
        }
      }
    })
  }

  magicAttack (x, y) {
    this.canMove = false
    this.anims.play('playerAttackMagical', true)
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
  scene.anims.create({
    key: 'playerAttackMagical',
    frameRate: 8,
    repeat: 0,
    frames: scene.anims.generateFrameNumbers('playerAttack', { start: 10, end: 14 })
  })
}
export default PlayerClass
