import Phaser from 'phaser'
import CONFIG from '../config.js'

import { webFontLoader } from 'google-webfont-loader'

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
    this.loadingFinished = false
    this.loadEvents = new Phaser.Events.EventEmitter()
    this.loadEvents.once('sceneReady', this.sceneReady, this)

    // Load the image assets needed for THIS scene
    this.load.image('StartScreen', 'assets/StartScreen.png')
    this.load.image('wallTexture', 'assets/tilemaps/spr_tile_wall.png')

    // Load the image assets needed for 'ExampleScene'
    this.load.image('room', 'assets/tilemaps/rm_test1.png')
    this.load.image('tutorialCollision', 'assets/tilemaps/rm_testCollision1.png')
    this.load.image('tutorialInteract', 'assets/tilemaps/rm_testInteract1.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('uiOutline', 'assets/sprites/spr_UI_Outline.png')

    this.load.tilemapTiledJSON('tutorialRoom', 'assets/tilemaps/tutorial_02.json')

    this.load.spritesheet('sideChest', 'assets/sprites/til_sideChest.png', { frameWidth: 300, frameHeight: 300 })
    this.load.spritesheet('frontChest', 'assets/sprites/til_frontChest.png', { frameWidth: 200, frameHeight: 200 })
    this.load.spritesheet('playerWalkIdle', 'assets/sprites/KnightWalkSpritesheet.png', { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('playerAttack', 'assets/sprites/KnightAttackSpreadsheet.png', { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('rat', 'assets/sprites/Rat300x300.png', { frameWidth: 300, frameHeight: 300 })
    this.load.spritesheet('fire', 'assets/sprites/Fire.png', { frameWidth: 100, frameHeight: 100 })
    // this.load.spritesheet('spawners', 'assets/tilemaps/til_spawners.png')
    // Pre-load the entire audio sprite
    this.load.audioSprite('gameAudio', 'assets/audio/gameAudioSprite.json', [
      'assets/audio/gameAudioSprite.ogg',
      'assets/audio/gameAudioSprite.m4a',
      'assets/audio/gameAudioSprite.mp3',
      'assets/audio/gameAudioSprite.ac3'
    ])

    // Load web fonts
    this.fontsLoaded = false
    webFontLoader({
      custom: {
        families: ['versal']
      },
      active: () => {
        this.fontsLoaded = true
        if (this.fontsLoaded && this.loadingFinished) {
          this.loadEvents.emit('sceneReady')
        }
      }
    })
  }

  create () {
    this.loadingFinished = true
    if (this.fontsLoaded && this.loadingFinished) {
      this.loadEvents.emit('sceneReady')
    }
  }

  sceneReady () {
    // Remove loading text
    this.loadingText.destroy()

    // Add background image
    // const startScreen = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'StartScreen')
    // startScreen.setScale(
    //   CONFIG.DEFAULT_WIDTH / startScreen.width,
    //   CONFIG.DEFAULT_HEIGHT / startScreen.height
    // )

    this.add.text(32, 32,
      'The face of the\nmoon was in\nshadow.',
      { fontFamily: 'versal', fontSize: 80, color: '#ff0000' }
    ).setShadow(2, 2, '#333333', 2, false, true)

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
