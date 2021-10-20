import Phaser from 'phaser'
import CONFIG from '../config.js'
import PlayerClass from '../systemScripts/player.js'

class StartScene extends Phaser.Scene {
  init () {
    this.loadingText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'Loading ...', { font: '16pt Arial', color: '#FFFFFF', align: 'center' }
    )
    this.loadingText.setOrigin(0.5, 0.5)
  }

  preload () {
    // Load the image assets needed for THIS scene
    this.load.image('StartScreen', 'assets/StartScreen.png')
    this.load.image('wallTexture', 'assets/tilemaps/til_cobbleWall.png')
    // Load the image assets needed for 'ExampleScene'
    this.load.image('room', 'assets/tilemaps/rm_test1.png')
    this.load.image('tutorialCollision', 'assets/tilemaps/rm_testCollision1.png')
    this.load.image('tutorialInteract', 'assets/tilemaps/rm_testInteract1.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.tilemapTiledJSON('tutorialRoom', 'assets/tilemaps/tutorial.json')

    this.load.spritesheet('playerWalkIdle', 'assets/sprites/KnightWalkSpritesheetSmall.png', { frameWidth: 900, frameHeight: 900 })

    // Pre-load the entire audio sprite
    this.load.audioSprite('gameAudio', 'assets/audio/gameAudioSprite.json', [
      'assets/audio/gameAudioSprite.ogg',
      'assets/audio/gameAudioSprite.m4a',
      'assets/audio/gameAudioSprite.mp3',
      'assets/audio/gameAudioSprite.ac3'
    ])

    // DEBUG: Fake loading lots of data
    // for (let i = 0; i < 300; i++) {
    //   this.load.image('sky' + i, 'assets/skies/space3.png')
    // }
  }

  create () {
    // Remove loading text
    this.loadingText.destroy()

    // Add background image
    const startScreen = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'StartScreen')
    startScreen.setScale(
      CONFIG.DEFAULT_WIDTH / startScreen.width,
      CONFIG.DEFAULT_HEIGHT / startScreen.height
    )

    this.player = new PlayerClass(this, 100, 100)

    // Add a callback when a key is released
    this.input.keyboard.on('keyup', this.keyReleased, this)

    // Load and play background music
    this.music = this.sound.addAudioSprite('gameAudio')
    this.music.play('freeVertexStudioTrack1')
  }

  keyReleased () {
    console.log('Key released')
    this.scene.start('ExampleScene')
    this.music.stop()
  }
}

export default StartScene
