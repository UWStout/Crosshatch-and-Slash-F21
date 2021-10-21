import Phaser from 'phaser'

import CONFIG from '../config.js'

class DevScene extends Phaser.Scene {
  preload () {
    // Loading is done in 'StartScene'
    // - 'sky' is background image
    // - 'red' is our particle
    // - 'logo' is the phaser3 logo
  }

  create () {
    // Setup variables with world bounds
    const worldWidth = CONFIG.DEFAULT_WIDTH * 5.65
    const worldHeight = CONFIG.DEFAULT_HEIGHT * 13.4

    // Add background image
    const sky = this.add.image(CONFIG.DEFAULT_WIDTH + 3600, CONFIG.DEFAULT_HEIGHT + 4200, 'tutorialRoom')
    const collisionTest = this.add.image(CONFIG.DEFAULT_WIDTH + 3600, CONFIG.DEFAULT_HEIGHT + 4200, 'tutorialCollision')
    collisionTest.visible = false
    // Create and animate the logo
    const logo = this.physics.add.image(400, 100, 'logo')
    logo.setVelocity(100, 200)
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)
    logo.body.onWorldBounds = true

    // Play sound when we hit the world bounds
    this.physics.world.on('worldbounds', () => { this.sfx.play('hitSound') }, this)

    // Adjust world bounds for physics and camera
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.startFollow(logo, false, 0.1)


    // Add a callback when a key is released
    this.input.keyboard.on('keyup', this.keyReleased, this)

    // Load and play background music
    this.music = this.sound.addAudioSprite('gameAudio')
    this.music.play('freeVertexStudioTrack2')

    // Create a sound instance for sfx
    this.sfx = this.sound.addAudioSprite('gameAudio')

    this.scene.run('HUDScene')
  }

  keyReleased () {
    console.log('Key released')
    this.scene.start('StartScene')
    this.scene.stop('HUDScene')
    this.music.stop()
  }
}

export default DevScene