import Phaser from 'phaser'

import CONFIG from '../config.js'

import PlayerClass from '../spriteScripts/player.js'

class ExampleScene extends Phaser.Scene {
  preload () {
    // Loading is done in 'StartScene'
    // - 'sky' is background image
    // - 'red' is our particle
    // - 'logo' is the phaser3 logo
  }

  create () {
    const map = this.make.tilemap({ key: 'tutorialRoom' })
    const room = map.addTilesetImage('spr_tile_wall', 'wallTexture')
    // Setup variables with world bounds
    const worldWidth = CONFIG.DEFAULT_WIDTH * 16
    const worldHeight = CONFIG.DEFAULT_HEIGHT * 2
    const backLayer = map.createLayer('til_map', room)
    const spawnLayer = map.createLayer('til_spawn', room)
    backLayer.setCollisionBetween(3, 6)
    this.matter.world.convertTilemapLayer(backLayer)
    console.log(backLayer.originX)

    // Create the player object
    this.player = new PlayerClass(this, 7000, 1000)
    this.canRotate = true

    // Play sound when we hit the world bounds
    this.matter.world.on('worldbounds', () => { this.sfx.play('hitSound') }, this)

    // Adjust world bounds for physics and camera
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
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
      // console.log(this.angle)
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

  generateCollision () {

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
