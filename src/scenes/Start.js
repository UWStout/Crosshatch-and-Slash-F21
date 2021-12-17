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
    this.load.image('pointer', 'assets/cursors/spr_UI_cursor.cur')
    this.load.image('StartScreen', 'assets/StartScreenLogo.png')
    this.load.image('wallTexture', 'assets/tilemaps/spr_tile_wall.png')
    this.load.image('bones', 'assets/tilemaps/til_bones.png')
    this.load.image('dungeon', 'assets/tilemaps/til_dungeon01.png')
    this.load.image('startButton', 'assets/sprites/Buttons/spr_UI_buttonStart.png')
    this.load.image('skip', 'assets/sprites/Buttons/Skip.png')

    // Load the images used for the cut scene
    this.load.image('TestScreen', 'assets/DialogTest.png')
    this.load.image('exitButton', 'assets/sprites/Buttons/spr_UI_buttonExit.png')

    this.load.image('Frame1', 'assets/IntroScenes/spr_IntroScene01.png')
    this.load.image('Frame2', 'assets/IntroScenes/spr_IntroScene02.png')
    this.load.image('Frame3', 'assets/IntroScenes/spr_IntroScene03.png')
    this.load.image('Frame4', 'assets/IntroScenes/spr_IntroScene04.png')
    this.load.image('Frame5', 'assets/IntroScenes/spr_IntroScene05.png')
    this.load.image('Frame6', 'assets/IntroScenes/spr_IntroScene06.png')
    this.load.image('Frame7', 'assets/IntroScenes/spr_IntroScene07.png')
    this.load.image('Frame8', 'assets/IntroScenes/spr_IntroScene08.png')
    this.load.image('Frame9', 'assets/IntroScenes/spr_IntroScene09.png')
    this.load.image('Frame10', 'assets/IntroScenes/spr_IntroScene10.png')

    this.load.image('Frame11', 'assets/IntroScenes/spr_IntroScene11.png')
    this.load.image('Frame12', 'assets/IntroScenes/spr_IntroScene12.png')
    this.load.image('Frame13', 'assets/IntroScenes/spr_IntroScene14.png')
    this.load.image('Frame14', 'assets/IntroScenes/spr_IntroScene15.png')
    this.load.image('Frame15', 'assets/IntroScenes/spr_IntroScene16.png')
    this.load.image('Frame16', 'assets/IntroScenes/spr_IntroScene17.png')
    this.load.image('Frame17', 'assets/IntroScenes/spr_IntroScene18.png')
    this.load.image('Frame18', 'assets/IntroScenes/spr_IntroScene20.png')
    this.load.image('Frame19', 'assets/IntroScenes/spr_IntroScene21.png')

    this.load.image('Frame20', 'assets/IntroScenes/spr_IntroScene22.png')
    this.load.image('Frame21', 'assets/IntroScenes/spr_IntroScene23.png')
    this.load.image('Frame22', 'assets/IntroScenes/spr_IntroScene24.png')
    this.load.image('Frame23', 'assets/IntroScenes/spr_IntroScene25.png')
    this.load.image('Frame24', 'assets/IntroScenes/spr_IntroScene26.png')
    this.load.image('Frame25', 'assets/IntroScenes/spr_IntroScene27.png')
    this.load.image('Frame26', 'assets/IntroScenes/spr_IntroScene28.png')
    this.load.image('Frame27', 'assets/IntroScenes/spr_IntroScene29.png')
    this.load.image('Frame28', 'assets/IntroScenes/spr_IntroScene30.png')
    this.load.image('Frame29', 'assets/IntroScenes/spr_IntroScene31.png')

    this.load.image('Frame30', 'assets/IntroScenes/spr_IntroScene32.png')
    this.load.image('Frame31', 'assets/IntroScenes/spr_IntroScene33.png')
    this.load.image('Frame32', 'assets/IntroScenes/spr_IntroScene34.png')
    this.load.image('Frame33', 'assets/IntroScenes/spr_IntroScene35.png')
    this.load.image('Frame34', 'assets/IntroScenes/spr_IntroScene36.png')
    this.load.image('Frame35', 'assets/IntroScenes/spr_IntroScene37.png')
    this.load.image('Frame36', 'assets/IntroScenes/spr_IntroScene38.png')
    this.load.image('Frame37', 'assets/IntroScenes/spr_IntroScene39.png')
    this.load.image('Frame38', 'assets/IntroScenes/spr_IntroScene40.png')
    
 

    this.load.tilemapTiledJSON('tutorialRoom', 'assets/tilemaps/rm_dungeon01.json')

    this.load.spritesheet('trapdoor', 'assets/sprites/spr_trapDoor.png', { frameWidth: 300, frameHeight: 300 })
    this.load.spritesheet('dice', 'assets/sprites/spr_UI_dice2.png', { frameWidth: 1152, frameHeight: 144 })
    this.load.spritesheet('sideChest', 'assets/sprites/til_sideChest.png', { frameWidth: 302, frameHeight: 302 })
    this.load.spritesheet('frontChest', 'assets/sprites/til_frontChest.png', { frameWidth: 302, frameHeight: 302 })
    this.load.spritesheet('playerWalkIdle', 'assets/sprites/KnightWalkSpritesheet.png', { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('playerAttack', 'assets/sprites/KnightAttackSpreadsheet.png', { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('RatWalkAttack', 'assets/sprites/RatAnimsSpritesheet300x300.png', { frameWidth: 300, frameHeight: 300 })
    this.load.spritesheet('Fire', 'assets/sprites/FireEffect.png', { frameWidth: 200, frameHeight: 200 })
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
    this.input.setDefaultCursor('url(assets/cursors/spr_UI_cursor.cur), pointer')
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

    const startButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2  - 750 , CONFIG.DEFAULT_HEIGHT / 2 + 100, 'startButton')
    startButton.setInteractive()
    // startButton.setScale(4.5, 4.5)
    startButton.on('pointerdown', () => {
      this.scene.start('CutScene')
      this.scene.stop('HUDScene')
    })

    // this.add.text(32, 32,
    //   'The face of the\nmoon was in\nshadow.',
    //   { fontFamily: 'versal', fontSize: 80, color: '#ff0000' }
    // ).setShadow(2, 2, '#333333', 2, false, true)

    // Add a callback when a key is released

    // Load and play background music
  }
}

export default StartScene
