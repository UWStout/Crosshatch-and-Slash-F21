import Phaser from 'phaser'

import CONFIG from '../config.js'

class HUDScene extends Phaser.Scene {
  constructor () {
    super()
  }

  create () {
    const ui = this.add.image(970, 960, 'uiOutline')
    ui.setScale(0.844, 0.844)
    const element = document.createElement('style')
    document.head.appendChild(element)
    const sheet = element.sheet
    const styles = '@font-face { font-family: "Versal Filled"; src: url("assets/VersalFilled-y1r3.ttf") format("opentype"); }'
    sheet.insertRule(styles, 0)
    
    this.loadingText = this.add.bitmapText(
      CONFIG.DEFAULT_WIDTH / 2 + 50,
      CONFIG.DEFAULT_HEIGHT - 80,
      'Versal', { fontFamily: 'versal', color: '#000000', align: 'center' }
    )
    // Phaser.Display.Align.In.Center(ui, this.add.zone(700, 940, 300, 300))
    this.loadingText.setOrigin(1, 1)
  }

  updateHealth (newHealth) {

  }

  updateExp (newExp) {

  }
}

export default HUDScene
