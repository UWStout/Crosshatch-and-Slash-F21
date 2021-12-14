import Phaser from 'phaser'
import CONFIG from '../config'
import DataManaging from '../scenes/DataManaging'
import FireBall from './projectiles/fireball'

const MANA_TIMEOUT = 5
const HEALTH_TIMEOUT = 10

class PlayerClass extends Phaser.Physics.Matter.Sprite {
  constructor (scene, x, y) {
    super(scene.matter.world, x, y, 'playerWalkIdle', 0)

    this.hud = scene.scene.get('HUDScene')

    this.canMove = true
    this.hasKey = false
    this.healthUpdateTimer = 0
    this.manaUpdateTimer = 0

    this.dataManaging = new DataManaging(20, 1, 1, 10, 1, 0, 0)
    this.currentHealth = 20
    this.currentMana = 10
    this.isAttacking = false

    this.PlayerSfx = this.scene.sound.addAudioSprite('gameAudio')

    if (!PlayerClass.animInitialize) {
      PlayerClass.setupAnim(scene)
    }

    this.levelUpExp = 5

    this.setScale(0.68, 0.68)

    const bodies = Phaser.Physics.Matter.Matter.Bodies
    const circleA = bodies.circle(x + 10, y - 60, 120, { isSensor: true, label: 'hitbox' })
    const circleB = bodies.circle(x, y, 100, { label: 'player' })

    const compoundBody = Phaser.Physics.Matter.Matter.Body.create({ parts: [circleB, circleA] })
    compoundBody.restitution = 0
    compoundBody.position = { x, y }

    this.setExistingBody(compoundBody)
    this.setOrigin(0.5, 0.6)
    this.setFixedRotation()
    this.setPosition(x, y)

    this.anims.play('playerIdle')

    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'playerAttackPhysical',
      () => {
        this.anims.play('playerIdle')

        this.canMove = true
        if (this.scene.canRotate !== null) {
          this.scene.canRotate = true
        }
      },
      this)
    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'playerAttackMagical',
      () => {
        setTimeout(() => {
          this.anims.play('playerIdle')

          this.canMove = true
          if (this.scene.canRotate !== null) {
            this.scene.canRotate = true
          }
        }, 250)
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
  }

  getDataManager () {
    return this.dataManaging
  }

  getHealth () {
    return this.currentHealth
  }

  getHasKey () {
    return this.hasKey
  }

  setHasKey () {
    this.hasKey = true
  }

  attack () {
    this.canMove = false

    if (this.scene.canRotate !== null) {
      this.scene.canRotate = false
    }

    this.anims.play('playerAttackPhysical', true)
    if (this.scene.sfxBool) {
      this.PlayerSfx.stop()
      const audioChoice = Math.floor(Math.random() * 12)
      if (audioChoice === 0) {
        this.PlayerSfx.play('Sword Slash 1_1')
      } else if (audioChoice === 1) {
        this.PlayerSfx.play('Sword Slash 2_1')
      } else if (audioChoice === 2) {
        this.PlayerSfx.play('Sword Slash 3_1')
      } else if (audioChoice === 3) {
        this.PlayerSfx.play('Sword Slash 4_1')
      } else if (audioChoice === 4) {
        this.PlayerSfx.play('Sword Slash 5_1')
      } else if (audioChoice === 5) {
        this.PlayerSfx.play('Sword Slash 6_1')
      } else if (audioChoice === 6) {
        this.PlayerSfx.play('Sword Swing 1_1')
      } else if (audioChoice === 7) {
        this.PlayerSfx.play('Sword Swing 2_1')
      } else if (audioChoice === 8) {
        this.PlayerSfx.play('Sword Swing 3_1')
      } else if (audioChoice === 9) {
        this.PlayerSfx.play('Sword Swing 4_1')
      } else if (audioChoice === 10) {
        this.PlayerSfx.play('Sword Swing 5_1')
      } else if (audioChoice === 11) {
        this.PlayerSfx.play('Sword Swing 6_1')
      }
    }

    this.overlapping.forEach((body) => {
      if (body.gameObject) {
        console.log('Hit', body.gameObject)

        this.damage = this.dataManaging.getStr() / 2
        this.damage = Phaser.Math.RoundTo(this.damage, 0)
        console.log(this.damage)

        switch (this.hud.getSword()) {
          case 1:
            body.gameObject.updateHp(this.damage + Phaser.Math.Between(1, 6))
            break
          case 2:
            body.gameObject.updateHp(this.damage + Phaser.Math.Between(1, 8))
            break
          case 3:
            body.gameObject.updateHp(this.damage + Phaser.Math.Between(1, 6) + Phaser.Math.Between(1, 6))
            break
          case 4:
            body.gameObject.updateHp(this.damage + Phaser.Math.Between(1, 20))
            break
          case 5:
            body.gameObject.updateHp(this.damage + Phaser.Math.Between(1, 6) + Phaser.Math.Between(1, 6))
            break
        }
        console.log(body.gameObject.stats.getHp())

        if (body.gameObject.stats.getHp() <= 0) {
          body.gameObject.updateState('DYING')
          this.scene.tweens.killTweensOf(body.gameObject)
          this.setCurrentExp(2)
          this.hud.updateExp(this.dataManaging.getExp(), this.levelUpExp)
        }
      }
    })
  }

  setCurrentExp (expToSet) {
    this.dataManaging.setExp(expToSet)
    console.log(this.dataManaging.getExp())

    if (this.dataManaging.getExp() >= this.levelUpExp) {
      this.levelUp(this.levelUpExp)
      this.levelUpExp += (this.levelUpExp * 0.25)
      this.hud.updateExp(this.dataManaging.getExp(), this.levelUpExp)
    } else {
      this.hud.updateExp(this.dataManaging.getExp(), this.levelUpExp)
    }
  }

  getCurrentExp () {
    return this.dataManaging.getExp()
  }

  levelUp (expHad) {
    console.log('level')

    this.dataManaging.setExp(-expHad)
    this.dataManaging.addLevel()
    this.hud.levelUpStats()
    this.hud.updateExp(this.dataManaging.getExp())
  }

  getMana () {
    return this.currentMana
  }

  adjustMana (newMana) {
    this.currentMana += newMana
    this.hud.updateMana(this.currentMana)
  }

  adjustHealth (newHealth) {
    if (newHealth < 0) {
      this.scene.cameras.main.shake(100, 0.0075)

      this.setVelocity(10 * CONFIG.WALK_SPEED, 10 * CONFIG.WALK_SPEED)
    }
    this.currentHealth += newHealth
    this.hud.updateHealth(this.currentHealth)
  }

  magicAttack (x, y, scene) {
    if (this.currentMana > 0) {
      if (this.scene.canRotate !== null) {
        this.scene.canRotate = false
      }

      this.canMove = false
      this.anims.play('playerAttackMagical', true)
      if (this.scene.sfxBool) {
        this.PlayerSfx.stop()
        const audioChoice = Math.floor(Math.random() * 5)
        if (audioChoice === 0) {
          this.PlayerSfx.play('Fire_Bolt_1')
        } else if (audioChoice === 1) {
          this.PlayerSfx.play('Fire_Bolt_2')
        } else if (audioChoice === 2) {
          this.PlayerSfx.play('Fire_Bolt_3')
        } else if (audioChoice === 3) {
          this.PlayerSfx.play('Fire_Bolt_4')
        } else if (audioChoice === 4) {
          this.PlayerSfx.play('Fire_Bolt_5')
        }
      }

      const endX = this.x + x
      const endY = this.y + y

      setTimeout(() => {
        const projectile = new FireBall(this.scene, this.x, this.y, this)
        console.log(projectile)
        projectile.anims.play('fireBall')
        projectile.setRotation(this.scene.angle + 90)
        const newTween = this.scene.tweens.add({
          targets: projectile,
          x: endX,
          y: endY,
          ease: 'Power1',
          duration: 250
        })

        newTween.on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
          if (projectile && !projectile.getIsPlayingBurnout()) {
            projectile.anims.play('burnout')
          }
        })
      }, 200)
      this.adjustMana(-1)
    }
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

  updateHealth (deltaTime) {
    if (this.currentHealth < this.dataManaging.getHp()) {
      if (this.healthUpdateTimer >= HEALTH_TIMEOUT) {
        this.adjustHealth(1)
        this.healthUpdateTimer = 0
      } else {
        this.healthUpdateTimer += deltaTime
      }
    }
  }

  updateMana (deltaTime) {
    if (this.getMana() < this.dataManaging.getInt()) {
      if (this.manaUpdateTimer >= MANA_TIMEOUT) {
        this.adjustMana(1)
        console.log('mana updated')
        this.manaUpdateTimer = 0
      } else {
        this.manaUpdateTimer += deltaTime
      }
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
    frameRate: 12,
    repeat: 0,
    frames: scene.anims.generateFrameNumbers('playerAttack', { start: 0, end: 4 })
  })
  scene.anims.create({
    key: 'playerAttackMagical',
    frameRate: 24,
    repeat: 0,
    frames: scene.anims.generateFrameNumbers('playerAttack', { start: 10, end: 14 })
  })
  // scene.anims.create({
  //   key: 'holdMagicAttack',
  //   frameRate: 0.01,
  //   repeat: 0,
  //   frames: scene.anims.generateFrameNumbers('playerAttack', { start: 14, end: 14 })
  // })
}
export default PlayerClass
