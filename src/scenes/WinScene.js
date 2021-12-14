import Phaser from 'phaser'
import CONFIG from '../config.js'
class WinScene extends Phaser.Scene {
  preload () {
    this.load.image('restartButton', 'assets/sprites/Buttons/spr_UI_buttonRestart.png')
  }

  create () {
    console.log('Scene started')
    const text1 = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2 - 200,
      200,
      'The story continues on...', { fontFamily: 'hamlet', color: '#FFFFFF', fontSize: 65 }
    )
    text1.alpha = 0

    const text2 = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2 - 70,
      700,
      'YOU WIN', { fontFamily: 'hamlet', color: '#FFFFFF', fontSize: 65 }
    )
    text2.alpha = 0

    const restartButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 - 430, 750, 'restartButton')
    restartButton.setInteractive()
    restartButton.on('pointerdown', () => {
      this.scene.stop()
      this.scene.start('ExampleScene')
    })
    restartButton.alpha = 0

    const exitButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 570, 750, 'exitButton')
    exitButton.setInteractive()
    exitButton.on('pointerdown', () => {
      this.scene.stop()
      this.scene.start('StartScene')
    })
    exitButton.alpha = 0

    this.tweens.add({
      targets: text1,
      duration: 1500,
      alpha: 1,
      ease: 'Power1'
    })

    this.tweens.add({
      targets: text2,
      duration: 1500,
      alpha: 1,
      ease: 'Power1',
      delay: 2000
    })
    this.tweens.add({
      targets: exitButton,
      duration: 1500,
      alpha: 1,
      ease: 'Power1',
      delay: 4000
    })
    this.tweens.add({
      targets: restartButton,
      duration: 1500,
      alpha: 1,
      ease: 'Power1',
      delay: 4000
    })
  }
}

export default WinScene
