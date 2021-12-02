import Phaser from 'phaser'

class Chest extends Phaser.Physics.Matter.Sprite {
  constructor (scene, x, y, chestChosen, chestLoot) {
    super(scene.matter.world, x, y, (chestChosen === Chest.FRONT_CHEST ? 'frontChest' : 'sideChest'), 0)
    this.chestLoot = chestLoot
    this.isOpened = false
    this.chestChosen = chestChosen
    this.chestAnimationEnded = false
    this.isInPlayer = false

    if (!Chest.animInitialized) {
      Chest.setupAnim(scene)
    }

    const bodies = Phaser.Physics.Matter.Matter.Bodies
    const rectA = bodies.rectangle(x - 50, y, 300, 370, { isSensor: true, label: 'chestOpens' })
    const rectB = bodies.rectangle(x - 50, y, 180, 250, { label: 'chest' })
    const chestBody = Phaser.Physics.Matter.Matter.Body.create({ parts: [rectB, rectA] })

    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'frontChestOpen', () => {
        this.chestAnimationEnded = true
      }
    )

    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'sideChestOpen', () => {
        this.chestAnimationEnded = true
      }
    )

    chestBody.position = { x, y }
    chestBody.restitution = 0

    this.setExistingBody(chestBody)

    this.setBounce(0)
    this.setPosition(x, y)
    this.setStatic(true)
    this.setOrigin(0.5, 0.5)

    this.setFixedRotation()
    this.setFrictionAir(1)
    this.setIgnoreGravity(false)

    scene.add.existing(this)

    this.setUpCollision(scene)
  }

  onOpen () {
    this.isOpened = true

    if (this.chestChosen === Chest.FRONT_CHEST) {
      this.play('frontChestOpen')
    } else {
      this.play('sideChestOpen')
    }
  }

  isInRange () {
    return this.isInPlayer
  }

  getChestLoot () {
    return this.chestLoot
  }

  isOpen () {
    return this.isOpened
  }

  getAnimationEnded () {
    return this.chestAnimationEnded
  }

  emptyChest () {
    this.setFrame(3)
  }

  setUpCollision (scene) {
    this.overlapping = new Set()

    scene.matter.world.on('collisionstart', (event) => {
      const pairs = event.pairs

      for (let i = 0; i < pairs.length; i++) {
        const body1 = pairs[i].bodyA
        const body2 = pairs[i].bodyB

        if (body1.label === 'chestOpens' && body2.label === 'hitbox') {
          this.overlapping.add(body2)
          this.isInPlayer = true
        }

        if (body2.label === 'chestOpens' && body1.label === 'hitbox') {
          this.overlapping.add(body1)
          this.isInPlayer = true
        }
      }
      // console.log(this.isInPlayer)
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

Chest.FRONT_CHEST = 0
Chest.SIDE_CHEST = 1

Chest.animInitialized = false
Chest.setupAnim = (scene) => {
  scene.anims.create({
    key: 'sideChestOpen',
    frameRate: 4,
    repeat: 0,
    frames: scene.anims.generateFrameNumbers('sideChest', { start: 0, end: 2 })
  })
  scene.anims.create({
    key: 'frontChestOpen',
    frameRate: 4,
    repeat: 0,
    frames: scene.anims.generateFrameNumbers('frontChest', { start: 0, end: 2 })
  })
  Chest.animInitialized = true
}

export default Chest
