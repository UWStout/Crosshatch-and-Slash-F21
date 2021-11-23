
import Phaser from 'phaser'
import EnemyStats from '../scenes/EnemyStats'
import EnemyStates from '../spriteScripts/EnemyStateMachines/enemyStates'

class RatEnemy extends Phaser.Physics.Matter.Sprite {
  constructor (scene, x, y) {
    super(scene.matter.world, x, y, 'RatWalkAttack', 1)
    if(!RatEnemy.animInitialize)
    {
      RatEnemy.setupAnim(scene)
    }
    this.canAttack = true
    this.isInPlayer = false
    this.startX = x
    this.startY = y
    this.cooldownActive = false
    // this.stats.setHp(5)
    // this.stats.setName('Rat')
    this.stats = new EnemyStats(5, 'Rat')
    const bodies = Phaser.Physics.Matter.Matter.Bodies
    const rectA = bodies.rectangle(x, y - 130, 150, 150, { isSensor: true, label: 'enemyhitbox' })
    const rectB = bodies.rectangle(x, y, 100, 300, { label: 'enemy' })
    const compoundBody = Phaser.Physics.Matter.Matter.Body.create({ parts: [rectB, rectA] })
    compoundBody.position = { x, y }
    compoundBody.restitution = 0
    this.setExistingBody(compoundBody)
    this.setBounce(0)
    this.setPosition(x, y)
    this.setOrigin(0.5, 0.5)
    this.setFixedRotation()
    this.setFrictionAir(1)
    this.setIgnoreGravity(false)
    scene.add.existing(this)
    this.setUpCollision(scene)
    this.CurrentState = EnemyStates.GUARDING
    //this.anims.play('ratWalk', true)
  }

  updateState (newstate) {
    if (this.currentState === EnemyStates.RECOVERING) {
      setTimeout(() => {
        this.currentState = newstate
      }, 1000)
    } else {
      this.currentState = newstate
    }
  }

  getStartX () {
    return this.startX
  }

  getStartY () {
    return this.startY
  }

  setOriginXY (x, y) {
    this.originX = x
    this.originY = y
  }

  enemyDieRespawn () {
    const self = this
    self.setVisible(false)
    setTimeout(
      () => {
        self.setVisible(true)
        self.setPosition(self.getStartX(), self.getStartY())
        self.stats.setHp(5)
        console.log(self.active)
      }, 5000)
  }

  updateAI (deltaTime) {
    const self = this
    switch (this.currentState) {
      case EnemyStates.GUARDING:
        // console.log('Currently standing guard')
        break

      case EnemyStates.PURSUING:
        // console.log('Currently pursuing the player')
        this.moveTowards()

        this.overlapping.forEach((body) => {
          if (body.label === 'player') {
            if (this.canAttack) {
              this.attack(body.gameObject)
              this.canAttack = false
              this.cooldown()
              console.log('Hit', body.gameObject)
            }
          }
        })

        break
      case EnemyStates.RECOVERING:
        // console.log('Currently recovering')
        break

      case EnemyStates.RETURNING:
        // console.log('Currently returning to guard point')
        this.moveBack()
        break

      default:
        // console.error('Unknown state')
        break
    }
  }

  cooldown () {
    const self = this
    setTimeout(() => {
      self.canAttack = true
    }, 2000)
  }

  moveBack () {
    const toX = Math.floor(this.originX / 300)
    const toY = Math.floor(this.originY / 300)
    const fromX = Math.floor(this.x / 300)
    const fromY = Math.floor(this.y / 300)
    this.scene.finder.findPath(fromX, fromY, toX, toY, (path) => {
      if (path === null) {
        // console.warn('Path was not found')
      } else {
        // console.log(path)
        this.scene.moveCharacterBack(path, this)
      }
    })
    this.scene.finder.calculate()
  }

  moveTowards () {
    const toX = Math.floor(this.scene.player.x / 300)
    const toY = Math.floor(this.scene.player.y / 300)
    const fromX = Math.floor(this.x / 300)
    const fromY = Math.floor(this.y / 300)
    // console.log('going from (' + fromX + ',' + fromY + ') to (' + toX + ',' + toY + ')')
    this.scene.finder.findPath(fromX, fromY, toX, toY, (path) => {
      if (path === null) {
        // console.warn('Path was not found')
      } else {
        // console.log(path)
        this.scene.moveCharacter(path, this)
      }
    })
    this.scene.finder.calculate()
  }

  updateHp () {
    if (!this.cooldownActive) {
      this.cooldownActive = true
      this.stats.setHp(this.stats.getHp() - 1)
      console.log(this.stats.getHp())
      setTimeout(() => {
        this.cooldownActive = false
        // console.log('cooldown over')
      }, 1000)
    }
  }

  attack (player) {
    // this.anims.play('ratAttack')
    player.adjustHealth(-1)
    console.log('Rat attacks')
  }

  setUpCollision (scene) {
    this.overlapping = new Set()
    scene.matter.world.on('collisionstart', (event) => {
      const pairs = event.pairs
      for (let i = 0; i < pairs.length; i++) {
        const body1 = pairs[i].bodyA
        const body2 = pairs[i].bodyB
        if (body1.label === 'enemyhitbox' && body2.label === 'player') {
          this.overlapping.add(body2)
          this.isInPlayer = true
        }
        if (body2.label === 'enemyhitbox' && body1.label === 'player') {
          this.overlapping.add(body1)
          this.isInPlayer = true
        }
      }
      // if (this.overlapping) {
      //   console.log('Collision Start', this.overlapping)
      // }
    }, this)

    scene.matter.world.on('collisionend', (event) => {
      const pairs = event.pairs
      for (let i = 0; i < pairs.length; i++) {
        const body1 = pairs[i].bodyA
        const body2 = pairs[i].bodyB
        if (this.overlapping.has(body1)) {
          this.overlapping.delete(body1)
          this.isInPlayer = false
        }

        if (this.overlapping.has(body2)) {
          this.overlapping.delete(body2)
          this.isInPlayer = false
        }
      }
      // console.log('Collision End', this.overlapping)
    }, this)
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
    frameRate: 8,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('RatWalkAttack', { start: 0, end: 7 })
  })

  scene.anims.create({
    key: 'ratAttack',
    frameRate: 12,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('RatWalkAttack', { start: 8, end: 12 })
  })
  RatEnemy.animInitialize = true
}

export default RatEnemy
