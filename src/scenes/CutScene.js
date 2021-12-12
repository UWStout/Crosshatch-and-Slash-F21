import Phaser, { Loader } from 'phaser'

import CONFIG from '../config.js'

class CutScene extends Phaser.Scene {
  preload () {
    // Loading is done in 'StartScene'
    // - 'sky' is background image
    // - 'red' is our particle
    // - 'logo' is the phaser3 logo
    // Load the image assets needed for 'ExampleScene'

  }

  create () {
    // Add a callback when a key is released
    this.input.keyboard.on('keyup', this.keyReleased, this)
    this.load.image('uiOutline', 'assets/sprites/spr_UI_Outline.png')
    this.load.image('exitButton', 'assets/sprites/Buttons/spr_UI_buttonExit.png')
    this.load.image('resumeButton', 'assets/sprites/Buttons/spr_UI_buttonResume.png')
    this.load.image('pauseButton', 'assets/sprites/Buttons/spr_UI_buttonPause.png')
    this.load.image('levelUp', 'assets/sprites/Buttons/spr_UI_buttonLevelUp.png')
    this.load.image('menuButton', 'assets/sprites/Buttons/spr_UI_buttonMenu.png')
    this.load.image('menuButtonIcon', 'assets/sprites/Buttons/spr_UI_buttonMenuIcon.png')
    this.load.image('blankBox', 'assets/sprites/Buttons/spr_UI_box.png')
    this.load.image('soundButton', 'assets/sprites/Buttons/spr_UI_buttonSound.png')
    this.load.image('soundButtonIcon', 'assets/sprites/Buttons/spr_UI_buttonSoundIcon.png')
    this.load.image('pausedIcon', 'assets/sprites/Buttons/spr_UI_Paused.png')
    this.load.image('levelUpManaButton', 'assets/sprites/Buttons/spr_UI_buttonLevelUp_Mana.png')
    this.load.image('levelUpStrengthButton', 'assets/sprites/Buttons/spr_UI_buttonLevelUp_Strength.png')
    this.load.image('sword1', 'assets/sprites/sword/spr_UI_Sword1.png')
    this.load.image('sword2', 'assets/sprites/sword/spr_UI_Sword2.png')
    this.load.image('sword3', 'assets/sprites/sword/spr_UI_Sword3.png')
    this.load.image('sword4', 'assets/sprites/sword/spr_UI_Sword4.png')
    this.load.image('sword5', 'assets/sprites/sword/spr_UI_Sword5.png')
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
    this.load.start()

    this.totalTolLoad = this.load.totalToLoad
    // Setup variables with world bounds
    let currentFrame = 1
    let Frame = 'Frame' + currentFrame

    // fade to black
    setTimeout(() => {
      this.cameras.main.fadeOut(1000, 0, 0, 0)
    }, 5000)

    this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      console.log(Frame)
      if (Frame === 39) {
        this.scene.start('ExampleScene')
        this.scene.stop('StartScene')
      }
      currentFrame++
      Frame = 'Frame' + currentFrame
      console.log(Frame)
      startScreen = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, Frame)
      startScreen.setScale(
        CONFIG.DEFAULT_WIDTH / startScreen.width,
        CONFIG.DEFAULT_HEIGHT / startScreen.height
      )
      this.cameras.main.fadeIn(1000, 0, 0, 0)
    })

    this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
      setTimeout(() => {
        this.cameras.main.fadeOut(1000, 0, 0, 0)
      }, 5000)
    })
    // Add background image
    let startScreen = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, Frame)
    startScreen.setScale(
      CONFIG.DEFAULT_WIDTH / startScreen.width,
      CONFIG.DEFAULT_HEIGHT / startScreen.height
    )
  }

  update () {
    if (this.load.totalComplete >= this.totalTolLoad) {
      this.scene.start('ExampleScene')
      this.scene.stop('StartScene')
    }
  }
}

export default CutScene
