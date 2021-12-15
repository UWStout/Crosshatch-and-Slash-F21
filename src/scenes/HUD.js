import Phaser from 'phaser'

import CONFIG from '../config.js'

class HUDScene extends Phaser.Scene {
  // constructor () {
  //   super()
  // }

  create (data) {
    this.maxMana = 10
    // this.input.setDefaultCursor('url(assets/cursors/spr_UI_cursor.cur), pointer')
    // this.music = this.sound.addAudioSprite('gameAudio')
    this.music = data?.music || null
    this.fightSong = data?.fightSong || null
    this.sfx = data?.sfx || null
    this.menusfx = data?.menusfx || null

    const dungeon = this.scene.get('ExampleScene')
    this.player = dungeon.getPlayer()
    const ui = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 20, CONFIG.DEFAULT_HEIGHT - 160, 'uiOutline')
    ui.setScale(1.16, 1.16)

    this.dice = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 150, 'dice')
    this.dice.setScale(1.8, 1.8)
    this.dice.anims.create({
      key: 'roll',
      frameRate: 8,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('dice', { start: 0, end: 7 })
    })

    this.healthText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2 + 33,
      CONFIG.DEFAULT_HEIGHT - 100,
      '20', { fontFamily: 'hamlet', color: '#000000', align: 'center', fontSize: 56 }
    )

    this.levelUpPoints = 0

    this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 20, CONFIG.DEFAULT_HEIGHT - 160, 'mana20')
    this.mana.setScale(1.16, 1.16)

    this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 20, CONFIG.DEFAULT_HEIGHT - 160, 'exp0')
    this.exp.setScale(1.16, 1.16)

    const fireballText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2 + 660,
      CONFIG.DEFAULT_HEIGHT - 90,
      'Fireball: 1d6 (1-6 damage)', { fontFamily: 'hamlet', color: '#000000', fontSize: 45 })

    // Phaser.Display.Align.In.Center(ui, this.add.zone(700, 940, 300, 300))
    this.healthText.setOrigin(1, 1)

    this.sword = this.add.image(CONFIG.DEFAULT_WIDTH / 4 + 50, CONFIG.DEFAULT_HEIGHT - 120, 'sword1')
    this.sword.setScale(1.36, 1.36)
    this.swordNumber = 1
    const exitButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 + 280, 'exitButton')

    this.swordText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 4 - 110,
      CONFIG.DEFAULT_HEIGHT - 120,
      'Iron Sword: 1d6\n(1-6 damage)', { fontFamily: 'hamlet', color: '#000000', fontSize: 45 })

    exitButton.setInteractive()
    exitButton.setVisible(false)
    exitButton.setScale(1.1, 1.1)
    exitButton.on('pointerdown', () => {
      const audioChoice = Math.floor(Math.random() * 3)
      if (audioChoice === 0) {
        this.menusfx.play('Pencil Writing 1_1')
      } else if (audioChoice === 1) {
        this.menusfx.play('Pencil Writing 2_1')
      } else if (audioChoice === 2) {
        this.menusfx.play('Pencil Writing 3_1')
      }

      this.scene.stop()
      this.scene.stop('ExampleScene')
      this.scene.start('StartScene')
    })

    const musicButtonIcon = this.add.image(CONFIG.DEFAULT_WIDTH - 40, 210, 'musicButtonIcon')
    musicButtonIcon.setScale(0.5, 0.5)

    const musicButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 - 180, 'musicButton')
    musicButton.setInteractive()
    musicButton.setVisible(false)
    musicButton.setScale(1.1, 1.1)
    musicButton.on('pointerup', () => {
      const audioChoice = Math.floor(Math.random() * 3)
      if (audioChoice === 0) {
        this.menusfx.play('Pencil Writing 1_1')
      } else if (audioChoice === 1) {
        this.menusfx.play('Pencil Writing 2_1')
      } else if (audioChoice === 2) {
        this.menusfx.play('Pencil Writing 3_1')
      }

      if (this.music) {
        console.log(this.music.isPlaying)
        if (this.music.isPlaying) {
          this.music.pause()
          this.fightSong.pause()
          musicButtonIcon.setVisible(false)
        } else {
          this.music.resume()
          this.fightSong.resume()
          musicButtonIcon.setVisible(true)
        }
      }
    })

    const resumeButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 - 415, 'resumeButton')
    resumeButton.setInteractive()
    resumeButton.setVisible(false)
    resumeButton.setScale(1.1, 1.1)
    resumeButton.on('pointerup', () => {
      this.menusfx.play('Pencil Writing 4_1')
      this.scene.resume('ExampleScene')
      this.pausedIcon.setVisible(false)
      exitButton.setVisible(false)
      soundButton.setVisible(false)
      resumeButton.setVisible(false)
      musicButton.setVisible(false)
    })

    const soundButtonIcon = this.add.image(CONFIG.DEFAULT_WIDTH - 40, 130, 'soundButtonIcon')
    soundButtonIcon.setScale(0.5, 0.5)

    const soundButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 + 55, 'soundButton')
    soundButton.setInteractive()
    soundButton.setVisible(false)
    soundButton.setScale(1.1, 1.1)
    soundButton.on('pointerup', () => {
      const audioChoice = Math.floor(Math.random() * 3)
      if (audioChoice === 0) {
        this.menusfx.play('Pencil Writing 1_1')
      } else if (audioChoice === 1) {
        this.menusfx.play('Pencil Writing 2_1')
      } else if (audioChoice === 2) {
        this.menusfx.play('Pencil Writing 3_1')
      }

      if (soundButtonIcon.visible) {
        soundButtonIcon.setVisible(false)
        this.sfx.pause()
      } else {
        soundButtonIcon.setVisible(true)

        this.sfx.resume()
      }
    }, this)

    this.pausedIcon = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 30, 80, 'pausedIcon')
    this.pausedIcon.setVisible(false)

    this.pauseButton = this.add.image(CONFIG.DEFAULT_WIDTH - 40, 50, 'pauseButton')

    this.pauseButton.setScale(0.5, 0.5)
    this.pauseButton.setInteractive()
    this.pauseButton.on('pointerdown', () => {
      this.menusfx.play('Pencil Writing 5_1')
      this.scene.pause('ExampleScene')

      this.pausedIcon.setVisible(true)
      exitButton.setVisible(true)
      soundButton.setVisible(true)
      resumeButton.setVisible(true)
      musicButton.setVisible(true)
    })

    this.levelUpIcon = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 - 415, 'levelUp')
    this.levelUpIcon.setScale(1.1, 1.1)

    this.manaButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 + 55, 'levelUpManaButton')

    this.manaButton.setScale(1.1, 1.1)
    this.manaButton.setInteractive()
    this.manaButton.on('pointerup', () => {
      this.player.getDataManager().setInt(1)
      this.maxMana = this.player.getDataManager().getInt()
      console.log(this.player.getDataManager().getInt())
      this.scene.resume('ExampleScene')
      this.pausedIcon.setVisible(false)
      this.levelUpIcon.setVisible(false)
      this.manaButton.setVisible(false)
      this.strengthButton.setVisible(false)
    })

    this.strengthButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 25, CONFIG.DEFAULT_HEIGHT / 2 - 180, 'levelUpStrengthButton')

    this.strengthButton.setScale(1.1, 1.1)
    this.strengthButton.setInteractive()
    this.strengthButton.on('pointerup', () => {
      this.player.getDataManager().setStr()
      this.scene.resume('ExampleScene')
      this.pausedIcon.setVisible(false)
      this.levelUpIcon.setVisible(false)
      this.manaButton.setVisible(false)
      this.strengthButton.setVisible(false)
    })

    this.levelUpIcon.setVisible(false)
    this.manaButton.setVisible(false)
    this.strengthButton.setVisible(false)
  }

  changeWeapon (swordNumber) {
    console.log('changing weapon to ' + swordNumber)
    this.sword.setTexture('sword' + swordNumber)
    this.swordNumber = swordNumber
    switch (swordNumber) {
      case 1:
        this.swordText.setText('Iron Sword: 1d6\n(1-6 damage)')
        break
      case 2:
        this.swordText.setText('Steel Sword: 1d8\n(1-8 damage)')
        break
      case 3:
        this.swordText.setText('Enchanted Sword: 2d6\n(2-12 damage)')
        break
      case 4:
        this.swordText.setText('Haunted Blade: 1d20\n(1-20 damage)')
        break
      case 5:
        this.swordText.setText('Ancient Blade: 2d6\n(2-12 damage)')
        break
    }
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
    this.scene.pause('ExampleScene')
    this.pausedIcon.setVisible(true)
    this.levelUpIcon.setVisible(true)
    this.manaButton.setVisible(true)
    this.strengthButton.setVisible(true)
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
