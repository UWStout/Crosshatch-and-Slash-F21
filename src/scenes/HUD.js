import Phaser from 'phaser'

import CONFIG from '../config.js'

class HUDScene extends Phaser.Scene {
  // constructor () {
  //   super()
  // }

  create () {
    this.maxMana = 10

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

    const exitButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 + 200, 'exitButton')

    exitButton.setInteractive()
    exitButton.setVisible(false)
    exitButton.setScale(0.9, 0.9)
    exitButton.on('pointerdown', () => {
      this.scene.stop()
      this.scene.stop('ExampleScene')
      this.scene.start('StartScene')
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
      } else {
        soundButtonIcon.setVisible(true)
      }
    })

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
    })

    this.levelUpIcon = this.add.image(100, 50, 'levelUp')
    this.levelUpIcon.setScale(0.5, 0.5)

    this.manaButton = this.add.image(100, 150, 'levelUpManaButton')

    this.manaButton.setScale(0.5, 0.5)
    this.manaButton.setInteractive()
    this.manaButton.on('pointerup', () => {
      this.player.getDataManager().setInt(1)
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

  updateExp (newExp, expNeeded) {
    this.expIncrement = 0
    const expToAdd = expNeeded / 21

    if (newExp !== 0) {
      for (let i = 0; i < newExp; i += expToAdd) {
        this.expIncrement++
      }

      switch (this.expIncrement) {
        case 1:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp1')
          this.exp.setScale(0.844, 0.844)
          break
        case 2:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp2')
          this.exp.setScale(0.844, 0.844)
          break
        case 3:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp3')
          this.exp.setScale(0.844, 0.844)
          break
        case 4:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp4')
          this.exp.setScale(0.844, 0.844)
          break
        case 5:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp5')
          this.exp.setScale(0.844, 0.844)
          break
        case 6:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp6')
          this.exp.setScale(0.844, 0.844)
          break
        case 7:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp7')
          this.exp.setScale(0.844, 0.844)
          break
        case 8:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp8')
          this.exp.setScale(0.844, 0.844)
          break
        case 9:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp9')
          this.exp.setScale(0.844, 0.844)
          break
        case 10:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp10')
          this.exp.setScale(0.844, 0.844)
          break
        case 11:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp11')
          this.exp.setScale(0.844, 0.844)
          break
        case 12:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp12')
          this.exp.setScale(0.844, 0.844)
          break
        case 13:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp13')
          this.exp.setScale(0.844, 0.844)
          break
        case 14:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp14')
          this.exp.setScale(0.844, 0.844)
          break
        case 15:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp15')
          this.exp.setScale(0.844, 0.844)
          this.exp.setScale(0.844, 0.844)
          break
        case 16:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp16')
          this.exp.setScale(0.844, 0.844)
          break
        case 17:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp17')
          this.exp.setScale(0.844, 0.844)
          break
        case 18:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp18')
          this.exp.setScale(0.844, 0.844)
          break
        case 19:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp19')
          this.exp.setScale(0.844, 0.844)
          break
        case 20:
          this.exp.destroy()
          this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp20')
          this.exp.setScale(0.844, 0.844)
          break
      }
    } else {
      this.exp.destroy()
      this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp0')
      this.exp.setScale(0.844, 0.844)
    }
  }

  updateMana (newMana) {
    this.manaIncrement = 0
    this.manaToAdd = this.maxMana / 21

    if (this.mana) {
      this.mana.destroy()
    }

    if (newMana === 0) {
      this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana0')
      this.mana.setScale(0.844, 0.844)
    } else {
      for (let i = 0; i <= newMana; i += this.manaToAdd) {
        this.manaIncrement++
      }

      switch (this.manaIncrement) {
        case 0:
          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana1')
          this.mana.setScale(0.844, 0.844)
          break
        case 1:
          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana2')
          this.mana.setScale(0.844, 0.844)
          break
        case 2:
          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana3')
          this.mana.setScale(0.844, 0.844)
          break
        case 3:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana4')
          this.mana.setScale(0.844, 0.844)
          break
        case 4:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana5')
          this.mana.setScale(0.844, 0.844)
          break
        case 5:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana6')
          this.mana.setScale(0.844, 0.844)
          break
        case 6:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana7')
          this.mana.setScale(0.844, 0.844)
          break
        case 7:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana8')
          this.mana.setScale(0.844, 0.844)
          break
        case 8:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana9')
          this.mana.setScale(0.844, 0.844)
          break
        case 9:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana10')
          this.mana.setScale(0.844, 0.844)
          break
        case 10:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana11')
          this.mana.setScale(0.844, 0.844)
          break
        case 11:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana12')
          this.mana.setScale(0.844, 0.844)
          break
        case 12:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana13')
          this.mana.setScale(0.844, 0.844)
          break
        case 13:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana14')
          this.mana.setScale(0.844, 0.844)
          break
        case 14:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana15')
          this.mana.setScale(0.844, 0.844)
          break
        case 15:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana16')
          this.mana.setScale(0.844, 0.844)
          break
        case 16:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana17')
          this.mana.setScale(0.844, 0.844)
          break
        case 17:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana18')
          this.mana.setScale(0.844, 0.844)
          break
        case 18:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana19')
          this.mana.setScale(0.844, 0.844)
          break
        case 19:

          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana20')
          this.mana.setScale(0.844, 0.844)
          break
        default:
          this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana20')
          this.mana.setScale(0.844, 0.844)
      }
    }
    console.log(this.manaIncrement)
  }
}

export default HUDScene
