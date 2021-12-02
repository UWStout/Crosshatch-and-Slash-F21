import Phaser from 'phaser'

import CONFIG from '../config.js'

class CutScene extends Phaser.Scene {
  preload () {
    // Loading is done in 'StartScene'
    // - 'sky' is background image
    // - 'red' is our particle
    // - 'logo' is the phaser3 logo
  }

  create () {
    // Setup variables with world bounds

    // Add background image
    const startScreen = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'TestScreen')
    startScreen.setScale(
      CONFIG.DEFAULT_WIDTH / startScreen.width,
      CONFIG.DEFAULT_HEIGHT / startScreen.height
    )
    // Create and animate the logo

    // Play sound when we hit the world bounds
   

    // Adjust world bounds for physics and camera


    // Add a callback when a key is released
    this.input.keyboard.on('keyup', this.keyReleased, this)
  }

  keyReleased () {
    console.log('Key released')
    this.scene.start('ExampleScene')
      this.scene.stop('StartScene')
    
  }
}

export default CutScene
