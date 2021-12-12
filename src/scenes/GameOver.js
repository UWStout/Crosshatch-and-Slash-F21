import Phaser from 'phaser'
import CONFIG from '../config'

class GameOverScene extends Phaser.Scene {
  preload () {
    this.load.image('restartButton', 'assets/sprites/buttons/spr_UI_buttonRestart.png')
  }

  create () {
    this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 100, CONFIG.DEFAULT_HEIGHT / 2, 'bones')
    const text1 = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      100,
      'You have fallen.', { fontFamily: 'hamlet', color: '#FFFFFF', fontSize: 45 }
    )
    text1.alpha = 0

    const text2 = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2 - 150,
      300,
      'The cycle will continue forever more.', { fontFamily: 'hamlet', color: '#FFFFFF', fontSize: 45 }
    )
    text2.alpha = 0

    const text3 = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      500,
      'GAME OVER', { fontFamily: 'hamlet', color: '#FFFFFF', fontSize: 45 }
    )
    text3.alpha = 0

    const restartButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 - 400, CONFIG.DEFAULT_HEIGHT / 2, 'restartButton')
    restartButton.setInteractive()
    restartButton.on('pointerdown', () => {
      this.scene.stop()
      this.scene.start('ExampleScene')
    })
    restartButton.alpha = 0

    const exitButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2 + 600, CONFIG.DEFAULT_HEIGHT / 2, 'exitButton')
    exitButton.setInteractive()
    exitButton.on('pointerdown', () => {
      this.scene.stop()
      this.scene.start('StartScene')
    })
    exitButton.alpha = 0

    this.tweens.add({
      targets: text1,
      duration: 2000,
      alpha: 1,
      ease: 'Power1'
    })

    this.tweens.add({
      targets: text2,
      duration: 2000,
      alpha: 1,
      ease: 'Power1',
      delay: 2500
    })

    this.tweens.add({
      targets: text3,
      duration: 2000,
      alpha: 1,
      ease: 'Power1',
      delay: 5000
    })

    this.tweens.add({
      targets: exitButton,
      duration: 2000,
      alpha: 1,
      ease: 'Power1',
      delay: 7500
    })

    this.tweens.add({
      targets: restartButton,
      duration: 2000,
      alpha: 1,
      ease: 'Power1',
      delay: 7500
    })
  }
}
export default GameOverScene
