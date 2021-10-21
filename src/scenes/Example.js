import Phaser from 'phaser'

import CONFIG from '../config.js'

import PlayerClass from '../systemScripts/player.js'

class ExampleScene extends Phaser.Scene {
  preload () {
    // Loading is done in 'StartScene'
    // - 'sky' is background image
    // - 'red' is our particle
    // - 'logo' is the phaser3 logo
  }

  create () {
    const map = this.make.tilemap({ key: 'tutorialRoom' })
    const room = map.addTilesetImage('tile_dungeon1', 'wallTexture')
    // Setup variables with world bounds
    const worldWidth = CONFIG.DEFAULT_WIDTH * 5.65
    const worldHeight = CONFIG.DEFAULT_HEIGHT * 13.4
    const backLayer = map.createLayer('Tile Layer 1', room)
    backLayer.setCollisionBetween(3, 6)
    console.log(backLayer.originX)
    // Add background image
    // const collisionTest = this.add.image(CONFIG.DEFAULT_WIDTH + 3600, CONFIG.DEFAULT_HEIGHT + 4200, 'tutorialRoom')
    // collisionTest.visible = false
    // Create and animate the logo
    this.player = new PlayerClass(this, 5000, 7800)
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, backLayer)
    this.canRotate = true

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.startFollow(this.player, false, 0.1)

    // Play sound when we hit the world bounds
    this.physics.world.on('worldbounds', () => { this.sfx.play('hitSound') }, this)

    // Adjust world bounds for physics and camera
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.startFollow(this.player, false, 0.1)

    // player look
    this.cursors = this.input.keyboard.createCursorKeys()
    this.cursors = this.input.keyboard.addKeys(
      {
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
      })

    // mouse look
    this.point = new Phaser.Math.Vector2(0, 0)
    this.input.on('pointermove', function (pointer) {
      // Copy world position of pointer and center on character
      this.point.set(pointer.worldX, pointer.worldY)
      // console.log('x: ' + (this.point.x) + ' Y: ' + this.point.y)
      this.point.x -= this.player.x
      this.point.y -= this.player.y

      // Shorten to max 20 units
      const length = this.point.length()
      if (length > 20) {
        this.point.scale(20 / length)
      }
    }, this)
    // Add a callback when a key is released
    // this.input.keyboard.on('keyup', this.keyReleased, this)

    // Load and play background music
    this.music = this.sound.addAudioSprite('gameAudio')
    this.music.play('freeVertexStudioTrack2')

    // Create a sound instance for sfx
    this.sfx = this.sound.addAudioSprite('gameAudio')
    this.scene.run('HUDScene')

    this.input.on('pointermove', function (pointer) {
      this.point.set(pointer.worldX, pointer.worldY)
      // console.log('x: ' + (this.point.x) + ' Y: ' + this.point.y)
      this.point.x -= this.player.x
      this.point.y -= this.player.y
      this.angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.player.x + this.point.x, this.player.y + this.point.y)
      console.log(this.angle)
      if (this.canRotate) {
        this.player.setAngle((Phaser.Math.RAD_TO_DEG * this.angle) + 90)
      }
    }, this)

    this.input.on('pointerup', (pointer) => {
      if (pointer.leftButtonReleased()) {
        this.canRotate = false
        this.player.attack()
      }

      if (pointer.rightButtonReleased()) {
        this.player.magicAttack(this.point.x, this.point.y)
      }

      setTimeout(() => {
        this.canRotate = true
      }, 625)
    }, this)
  }

  collisionTrue () {
    console.log('collision')
  }

  keyReleased () {
    console.log('Key released')
    this.scene.start('StartScene')
    this.scene.stop('HUDScene')
    this.music.stop()
  }

  update () {
    const directon = { x: 0, y: 0 }
    if (this.cursors.right.isDown) {
      directon.x += 1
    }
    if (this.cursors.left.isDown) {
      directon.x -= 1
    }
    if (this.cursors.up.isDown) {
      directon.y -= 1
    }
    if (this.cursors.down.isDown) {
      directon.y += 1
    }

    this.player.move(directon.x, directon.y)
  }
}

export default ExampleScene
