import Phaser from 'phaser'

class Trapdoor extends Phaser.Physics.Matter.Sprite {
  constructor (scene, x, y) {
    super(scene.matter.world, x, y, 'trapdoor', 0)
    this.opened = false
    this.setPosition(x, y)
    this.setStatic(true)
    this.setAngle(180)
    this.setFlipX()
    scene.add.existing(this)
  }

  setOpened () {
    this.opened = true
    this.setFrame(1)
  }

  getOpened () {
    return this.opened
  }
}

export default Trapdoor
