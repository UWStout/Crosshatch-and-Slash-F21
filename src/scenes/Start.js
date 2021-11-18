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
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('uiOutline', 'assets/sprites/spr_UI_Outline.png')
    this.load.image('mana0', 'assets/sprites/mana/spr_UI_Mana1.png')
    this.load.image('mana1', 'assets/sprites/mana/spr_UI_Mana2.png')
    this.load.image('mana2', 'assets/sprites/mana/spr_UI_Mana3.png')
    this.load.image('mana3', 'assets/sprites/mana/spr_UI_Mana4.png')
    this.load.image('mana4', 'assets/sprites/mana/spr_UI_Mana5.png')
    this.load.image('mana5', 'assets/sprites/mana/spr_UI_Mana6.png')
    this.load.image('mana6', 'assets/sprites/mana/spr_UI_Mana7.png')
    this.load.image('mana7', 'assets/sprites/mana/spr_UI_Mana8.png')
    this.load.image('mana8', 'assets/sprites/mana/spr_UI_Mana9.png')
    this.load.image('mana9', 'assets/sprites/mana/spr_UI_Mana10.png')
    this.load.image('mana10', 'assets/sprites/mana/spr_UI_Mana11.png')
    this.load.image('mana11', 'assets/sprites/mana/spr_UI_Mana12.png')
    this.load.image('mana12', 'assets/sprites/mana/spr_UI_Mana13.png')
    this.load.image('mana13', 'assets/sprites/mana/spr_UI_Mana14.png')
    this.load.image('mana14', 'assets/sprites/mana/spr_UI_Mana15.png')
    this.load.image('mana15', 'assets/sprites/mana/spr_UI_Mana16.png')
    this.load.image('mana16', 'assets/sprites/mana/spr_UI_Mana17.png')
    this.load.image('mana17', 'assets/sprites/mana/spr_UI_Mana18.png')
    this.load.image('mana18', 'assets/sprites/mana/spr_UI_Mana19.png')
    this.load.image('mana19', 'assets/sprites/mana/spr_UI_Mana20.png')
    this.load.image('mana20', 'assets/sprites/mana/spr_UI_Mana21.png')
    this.load.image('exp0', 'assets/sprites/exp/spr_UI_Exp1.png')
    this.load.image('exp1', 'assets/sprites/exp/spr_UI_Exp2.png')
    this.load.image('exp2', 'assets/sprites/exp/spr_UI_Exp3.png')
    this.load.image('exp3', 'assets/sprites/exp/spr_UI_Exp4.png')
    this.load.image('exp4', 'assets/sprites/exp/spr_UI_Exp5.png')
    this.load.image('exp5', 'assets/sprites/exp/spr_UI_Exp6.png')
    this.load.image('exp6', 'assets/sprites/exp/spr_UI_Exp7.png')
    this.load.image('exp7', 'assets/sprites/exp/spr_UI_Exp8.png')
    this.load.image('exp8', 'assets/sprites/exp/spr_UI_Exp9.png')
    this.load.image('exp9', 'assets/sprites/exp/spr_UI_Exp10.png')
    this.load.image('exp10', 'assets/sprites/exp/spr_UI_Exp11.png')
    this.load.image('exp11', 'assets/sprites/exp/spr_UI_Exp12.png')
    this.load.image('exp12', 'assets/sprites/exp/spr_UI_Exp13.png')
    this.load.image('exp13', 'assets/sprites/exp/spr_UI_Exp14.png')
    this.load.image('exp14', 'assets/sprites/exp/spr_UI_Exp15.png')
    this.load.image('exp15', 'assets/sprites/exp/spr_UI_Exp16.png')
    this.load.image('exp16', 'assets/sprites/exp/spr_UI_Exp17.png')
    this.load.image('exp17', 'assets/sprites/exp/spr_UI_Exp18.png')
    this.load.image('exp18', 'assets/sprites/exp/spr_UI_Exp19.png')
    this.load.image('exp19', 'assets/sprites/exp/spr_UI_Exp20.png')
    this.load.image('exp20', 'assets/sprites/exp/spr_UI_Exp21.png')

    this.load.tilemapTiledJSON('tutorialRoom', 'assets/tilemaps/tutorial_02.json')

    this.load.spritesheet('dice', 'assets/sprites/spr_UI_dice.png', {frameWidth: 200, frameHeight: 200 })
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
        families: ['hamlet']
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
    const startScreen = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'StartScreen')
    startScreen.setScale(
      CONFIG.DEFAULT_WIDTH / startScreen.width,
      CONFIG.DEFAULT_HEIGHT / startScreen.height
    )

    // this.add.text(32, 32,
    //   'The face of the\nmoon was in\nshadow.',
    //   { fontFamily: 'versal', fontSize: 80, color: '#ff0000' }
    // ).setShadow(2, 2, '#333333', 2, false, true)

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
