import Phaser from 'phaser'

import CONFIG from '../config.js'

class HUDScene extends Phaser.Scene {
  // constructor () {
  //   super()
  // }

  create (data) {
    this.maxMana = 10
    // this.music = this.sound.addAudioSprite('gameAudio')
    this.music = data?.music || null
    this.sfx = data?.sfx || null
    const dungeon = this.scene.get('ExampleScene')
    this.player = dungeon.getPlayer()
    const ui = this.add.image(970, 960, 'uiOutline')
    ui.setScale(0.844, 0.844)

    this.dice = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'dice')
    this.dice.setScale(1.6, 1.6)
    this.dice.anims.create({
      key: 'roll',
      frameRate: 8,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('dice', { start: 0, end: 7 })
    })

    this.healthText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2 + 33,
      CONFIG.DEFAULT_HEIGHT - 75,
      '20', { fontFamily: 'hamlet', color: '#000000', align: 'center', fontSize: 50 }
    )

    this.levelUpPoints = 0

    this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana20')
    this.mana.setScale(0.844, 0.844)

    this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp0')
    this.exp.setScale(0.844, 0.844)

    // Phaser.Display.Align.In.Center(ui, this.add.zone(700, 940, 300, 300))
    this.healthText.setOrigin(1, 1)

    this.sword = this.add.image(CONFIG.DEFAULT_WIDTH / 4 + 50, CONFIG.DEFAULT_HEIGHT - 90, 'sword1')
    this.swordNumber = 1
    const exitButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 + 200, 'exitButton')

    exitButton.setInteractive()
    exitButton.setVisible(false)
    exitButton.setScale(0.9, 0.9)
    exitButton.on('pointerdown', () => {
      this.scene.stop()
      this.scene.stop('ExampleScene')
      this.scene.start('StartScene')
    })

    const musicButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 - 150, 'blankBox')
    musicButton.setInteractive()
    musicButton.setVisible(false)
    musicButton.setScale(0.38, 0.92)
    musicButton.on('pointerdown', () => {
      if (this.music) {
        if (this.music.isPlaying) {
          this.music.pause()
        } else {
          this.music.resume()
        }
      }
    })

    const resumeButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 - 325, 'resumeButton')
    resumeButton.setInteractive()
    resumeButton.setVisible(false)
    resumeButton.setScale(0.9, 0.9)
    resumeButton.on('pointerdown', () => {
      this.scene.resume('ExampleScene')
      this.pausedIcon.setVisible(false)
      exitButton.setVisible(false)
      soundButton.setVisible(false)
      resumeButton.setVisible(false)
      musicButton.setVisible(false)
    })

    const soundButtonIcon = this.add.image(CONFIG.DEFAULT_WIDTH - 40, CONFIG.DEFAULT_HEIGHT - 100, 'soundButtonIcon')
    soundButtonIcon.setScale(0.5, 0.5)

    const soundButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 + 25, 'soundButton')
    soundButton.setInteractive()
    soundButton.setVisible(false)
    soundButton.setScale(0.9, 0.9)
    soundButton.on('pointerdown', () => {
      if (soundButtonIcon.visible) {
        soundButtonIcon.setVisible(false)
        if (this.sfx) { this.sfx.pause() }
      } else {
        soundButtonIcon.setVisible(true)
        if (this.sfx) { this.sfx.resume() }
      }
    }, this)

    this.pausedIcon = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 30, 80, 'pausedIcon')
    this.pausedIcon.setVisible(false)

    this.pauseButton = this.add.image(CONFIG.DEFAULT_WIDTH - 40, 50, 'pauseButton')

    this.pauseButton.setScale(0.5, 0.5)
    this.pauseButton.setInteractive()
    this.pauseButton.on('pointerdown', () => {
      this.scene.pause('ExampleScene')

      this.pausedIcon.setVisible(true)
      exitButton.setVisible(true)
      soundButton.setVisible(true)
      resumeButton.setVisible(true)
      musicButton.setVisible(true)
    })

    this.levelUpIcon = this.add.image(100, 50, 'levelUp')
    this.levelUpIcon.setScale(0.5, 0.5)

    this.manaButton = this.add.image(100, 150, 'levelUpManaButton')

    this.manaButton.setScale(0.5, 0.5)
    this.manaButton.setInteractive()
    this.manaButton.on('pointerup', () => {
      this.player.getDataManager().setInt(1)
      this.maxMana = this.player.getDataManager().getInt()
      console.log(this.player.getDataManager().getInt())
      this.levelUpPoints--
      if (this.levelUpPoints === 0) {
        this.levelUpIcon.setVisible(false)
        this.manaButton.setVisible(false)
        this.strengthButton.setVisible(false)
      }
    })

    this.strengthButton = this.add.image(100, 250, 'levelUpStrengthButton')

    this.strengthButton.setScale(0.5, 0.5)
    this.strengthButton.setInteractive()
    this.strengthButton.on('pointerup', () => {
      this.player.getDataManager().setStr()
      this.levelUpPoints--
      if (this.levelUpPoints === 0) {
        this.levelUpIcon.setVisible(false)
        this.manaButton.setVisible(false)
        this.strengthButton.setVisible(false)
      }
    })

    this.levelUpIcon.setVisible(false)
    this.manaButton.setVisible(false)
    this.strengthButton.setVisible(false)
  }

  changeWeapon (swordNumber) {
    this.sword.setTexture('sword' + swordNumber)
    this.swordNumber = swordNumber
  }

  updateHealth (newHealth) {
    this.healthText.setText('')

    setTimeout(() => {
      this.dice.setFrame(0)
      this.healthText.setText(newHealth)
    }, 950)

    this.dice.play('roll')
  }

  levelUpStats () {
    this.levelUpPoints++

    if (!this.levelUpIcon.visible) {
      this.levelUpIcon.setVisible(true)
      this.manaButton.setVisible(true)
      this.strengthButton.setVisible(true)
    }
  }

  getSword () {
    return this.swordNumber
  }

  updateExp (newExp, expNeeded) {
    this.expIncrement = 0
    const expToAdd = expNeeded / 21

    if (newExp !== 0) {
      for (let i = 0; i < newExp; i += expToAdd) {
        this.expIncrement++
      }

      this.exp.setTexture('exp' + this.expIncrement)
    } else {
      this.exp.setTexture('exp0')
    }
  }

  updateMana (newMana) {
    this.manaIncrement = 0
    this.manaToAdd = this.maxMana / 21

    if (newMana === 0) {
      this.mana.setTexture('mana0')
    } else {
      for (let i = 0; i <= newMana; i += this.manaToAdd) {
        this.manaIncrement++
      }
      this.manaIncrement = Phaser.Math.Clamp(this.manaIncrement, 0, 20)
      this.mana.setTexture('mana' + this.manaIncrement)
    }
    console.log(this.manaIncrement)
  }
}

export default HUDScene
