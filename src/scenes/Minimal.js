import Phaser from 'phaser'

import CONFIG from '../config.js'
import RatEnemy from '../spriteScripts/rat.js'

class MinimalScene extends Phaser.Scene {
  preload () {
    this.load.spritesheet('RatWalkAttack', 'assets/sprites/RatAnimsSpritesheet300x300.png', { frameWidth: 300, frameHeight: 300 })
  }

  create () {
    this.enemies = [
      new RatEnemy(this, CONFIG.DEFAULT_WIDTH / 2 - 100, CONFIG.DEFAULT_HEIGHT / 2),
      new RatEnemy(this, CONFIG.DEFAULT_WIDTH / 2 + 100, CONFIG.DEFAULT_HEIGHT / 2)      
    ]

    // Play walk anim
    this.enemies[0].play('ratWalk')

    // Play attack anim every 3 seconds
    setInterval(() => {
      this.enemies[1].play('ratAttack')
    }, 3000)

    // this.enemies.forEach(enemy => {
    //   enemy.setCollisionCategory(targetsCategory)
    //   enemy.canRotate = true
    //   enemy.setOriginXY(enemy.x, enemy.y)

    //   enemy.on('destroy', () => {
    //     const index = this.enemies.findIndex((item) => (item === enemy))
    //     if (index >= 0) {
    //       this.enemies.splice(index, 1)
    //     }

    //     enemy.updateState('DYING')
    //     this.tweens.pauseAll()
    //     this.tweens.killTweensOf(enemy)
    //     this.tweens.resumeAll()
    //   }, this)
    // })
  }
}

export default MinimalScene
