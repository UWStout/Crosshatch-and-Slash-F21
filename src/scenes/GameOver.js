import Phaser from 'phaser'
import CONFIG from '../config'

class GameOverScene extends Phaser.Scene {
  create () {
    this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'bones')
    const text1 = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      100,
      'You have fallen.', { fontFamily: 'hamlet', color: '#000000', fontSize: 45 }
    )
    text1.setAlpha(0)
    const text2 = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      300,
      'The cycle will continue forever more.', { fontFamily: 'hamlet', color: '#000000', fontSize: 45 }
    )
    text2.setAlpha(0)
    const text3 = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      500,
      'GAME OVER', { fontFamily: 'hamlet', color: '#000000', fontSize: 45 }
    )
    text3.setAlpha(0)
    const text1tween = this.tweens.add({
      targets: text1,
      duration: 2000
    })
  }
}
export default GameOverScene
