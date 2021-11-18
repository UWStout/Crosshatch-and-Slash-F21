import Phaser from 'phaser'

import CONFIG from '../config.js'

class HUDScene extends Phaser.Scene {
  constructor () {
    super()
  }

  create () {
    const ui = this.add.image(970, 960, 'uiOutline')
    ui.setScale(0.844, 0.844)
    this.dice = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 50, CONFIG.DEFAULT_HEIGHT - 80, '')
    HUDScene.animInitialized(this)
    this.loadingText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2 + 50,
      CONFIG.DEFAULT_HEIGHT - 80,
      '20', { fontFamily: 'hamlet', color: '#000000', align: 'center', fontSize: 64 }
    )
    this.mana = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'mana18')
    this.mana.setScale(0.844, 0.844)
    this.exp = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 10, CONFIG.DEFAULT_HEIGHT - 120, 'exp18')
    this.exp.setScale(0.844, 0.844)
    // Phaser.Display.Align.In.Center(ui, this.add.zone(700, 940, 300, 300))
    this.loadingText.setOrigin(1, 1)
  }

  updateHealth (newHealth) {
    this.loadingText.setText(newHealth)
  }

  updateExp (newExp, expNeeded) {
  }

  updateMana (newMana) {

  }
}
HUDScene.animInitialized = (scene) => {
  scene.anims.create({
    key: 'roll',
    frameRate: 4,
    repeat: 0,
    frames: scene.anims.generateFrameNumbers('dice', { start: 0, end: 7 })
  })
}

export default HUDScene
