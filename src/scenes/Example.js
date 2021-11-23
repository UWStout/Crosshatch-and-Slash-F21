import EasyStar from 'easystarjs/src/easystar'
import Phaser from 'phaser'

import CONFIG from '../config.js'
import Chest from '../spriteScripts/chest.js'

import PlayerClass from '../spriteScripts/player.js'
import RatEnemy from '../spriteScripts/rat.js'
import HUDScene from './HUD.js'

class ExampleScene extends Phaser.Scene {
  create () {
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.music.stop()
    })

    this.input.mouse.disableContextMenu()
    const map = this.make.tilemap({ key: 'tutorialRoom' })
    const room = map.addTilesetImage('spr_tile_wall', 'wallTexture')

    // Setup variables with world bounds
    const worldWidth = CONFIG.DEFAULT_WIDTH * 16
    const worldHeight = CONFIG.DEFAULT_HEIGHT * 2
    const backLayer = map.createLayer('til_map', room)
    const spawnLayer = map.createLayer('til_spawn', room)

    backLayer.setCollisionBetween(3, 6)
    this.matter.world.convertTilemapLayer(backLayer)
    this.tilemapBodies = this.fixFlippedColliders(backLayer)

    // Create the player object
    this.player = new PlayerClass(this, 6000, 6500)
    this.canRotate = true

    // Create the chest object
    this.chest = new Chest(this, 5500, 6400, Chest.SIDE_CHEST)

    // Create enemy objects in the scene
    // Enemies array that holds all enemies
    this.enemies = []
    this.activeEnemies = []

    // Create the category used for tracking enemies
    const targetsCategory = this.matter.world.nextCategory()

    // Create the rat enemies
    const rat1 = new RatEnemy(this, 6500, 6500)
    this.enemies.push(rat1)

    const rat2 = new RatEnemy(this, 6000, 6500)
    this.enemies.push(rat2)

    this.enemies.forEach(enemy => {
      enemy.setCollisionCategory(targetsCategory)
      enemy.canRotate = true
      enemy.setOriginXY(enemy.x, enemy.y)

      enemy.on('destroy', () => {
        const index = this.enemies.findIndex((item) => (item === enemy))
        if (index >= 0) {
          this.enemies.splice(index, 1)
        }

        enemy.updateState('DYING')
        this.tweens.pauseAll()
        this.tweens.killTweensOf(enemy)
        this.tweens.resumeAll()
      }, this)
    })
    // this.enemies.push(this.enemy)

    // this.enemy.setCollisionCategory(targetsCategory)

    this.matter.world.on('worldbounds', () => { this.sfx.play('hitSound') }, this)

    // Adjust world bounds for physics and camera
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.player, false, 0.1)

    this.cameraBody = this.matter.add.rectangle(this.player.x, this.player.y, 1920, 1080, { isSensor: true, label: 'cameraBox' })

    // Set the HUD for the game
    this.scene.run('HUDScene')
    this.HUD = this.scene.get('HUDScene')
    this.activeTileBodies = this.matter.query.region(this.tilemapBodies, this.cameraBody.bounds)

    // for (const wall of this.activeTileBodies) {
    //   this.activeWallGroup.add(wall)
    // }

    // EasyStar Pathfinding
    this.finder = new EasyStar.js()

    this.finder.setGrid(this.grid)
    this.finder.setAcceptableTiles([1, 2])
    this.finder.enableDiagonals()
    this.finder.enableCornerCutting(0)

    // RAYCAST VARIABLES
    this.raycaster = this.raycasterPlugin.createRaycaster()
    this.ray = this.raycaster.createRay({
      origin: {
        x: 400,
        y: 300
      },
      autoSlice: true,
      collisionRange: 1000
    })

    // this.time.addEvent({
    //   delay: 5000,
    //   loop: true,
    //   callbackScope: this,
    //   callback: this.player.setMana(1)
    // })
    // this.time.addEvent({
    //   delay: 5000,
    //   loop: true,
    //   callbackScope: this,
    //   callback: this.HUD.updateMana(this.player.getMana())
    // })
    this.ray.enablePhysics('matter')
    this.ray.setCollidesWith(targetsCategory)

    this.ray.setOnCollide((collisionInfo) => {
      const target = collisionInfo.bodyA.label === 'phaser-raycaster-ray-body' ? collisionInfo.bodyB.gameObject : collisionInfo.bodyA.gameObject
      target.updateState('PURSUING')
    })

    this.ray.setOnCollideEnd((collisionInfo) => {
      const target = collisionInfo.bodyA.label === 'phaser-raycaster-ray-body' ? collisionInfo.bodyB.gameObject : collisionInfo.bodyA.gameObject
      target.updateState('RETURNING')
    })

    this.intersections = this.ray.castCircle()

    this.graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x00ff00 }, fillStyle: { color: 0xffffff, alpha: 0.3 } })

    this.draw()

    // player look
    this.cursors = this.input.keyboard.createCursorKeys()
    this.cursors = this.input.keyboard.addKeys(
      {
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        open: Phaser.Input.Keyboard.KeyCodes.E
      })

    // mouse look
    this.point = new Phaser.Math.Vector2(0, 0)
    this.input.on('pointermove', function (pointer) {
      // Copy world position of pointer and center on character
      this.point.set(pointer.worldX, pointer.worldY)
      // console.log('x: ' + (this.point.x) + ' Y: ' + this.point.y)
      this.point.x -= this.player.x
      this.point.y -= this.player.y

      // Shorten to max 20 units
      const length = this.point.length()
      if (length > 20) {
        this.point.scale(20 / length)
      }
    }, this)

    // Load and play background music
    this.music = this.sound.addAudioSprite('gameAudio')
    this.music.play('Keep')
    this.fightSong = this.sound.addAudioSprite('gameAudio')
    this.fightSong.play('prevail')
    this.fightSong.setVolume(0)
   

    // Create a sound instance for sfx
    this.sfx = this.sound.addAudioSprite('gameAudio')

    this.input.on('pointermove', function (pointer) {
      this.point.set(pointer.worldX, pointer.worldY)
      this.point.x -= this.player.x
      this.point.y -= this.player.y
      this.angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.player.x + this.point.x, this.player.y + this.point.y)

      if (this.canRotate) {
        this.player.setAngle((Phaser.Math.RAD_TO_DEG * this.angle) + 90)
      }
    }, this)

    this.input.on('pointerup', (pointer) => {
      if (pointer.leftButtonReleased()) {
        this.player.attack()
      }

      if (pointer.rightButtonReleased()) {
        this.player.magicAttack(this.point.x, this.point.y, this.HUD)
        this.HUD.updateMana(this.player.getMana())
      }
    }, this)
  }

  getPlayer () {
    return this.player
  }

  update (time, deltaTime) {
    const directon = { x: 0, y: 0 }

    if (this.cursors.right.isDown) {
      directon.x += 1
    }

    if (this.cursors.left.isDown) {
      directon.x -= 1
    }

    if (this.cursors.up.isDown) {
      directon.y -= 1
    }

    if (this.cursors.down.isDown) {
      directon.y += 1
    }

    if (this.cursors.open.isDown) {
      if (this.chest.isInRange() && !this.chest.isOpen()) {
        this.chest.onOpen()
      }

      if (this.chest.getAnimationEnded()) {
        console.log('called')
        this.HUD.changeWeapon(3)
        this.chest.emptyChest()
      }
    }

    this.player.move(directon.x, directon.y)

    // Update the HUD
    this.player.updateMana(deltaTime / 1000)
    this.player.updateHealth(deltaTime / 1000)

    if (Math.abs(directon.x) > 0 || Math.abs(directon.y) > 0) {
      this.matter.body.setPosition(this.cameraBody, { x: this.player.x, y: this.player.y })
      this.activeTileBodies = this.matter.query.region(this.tilemapBodies, this.cameraBody.bounds)
      this.raycaster.mappedObjects = []
      this.raycaster.mapGameObjects(this.activeTileBodies, true)
    }

    if (this.enemies) {
      this.enemies.forEach((enemy) => {
        if (enemy.visible) {
          enemy.updateAI(deltaTime)
          const enemyAngle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y)
          enemy.setAngle((Phaser.Math.RAD_TO_DEG * enemyAngle) + 90)
        }
      })
    }

    // cast ray in all directions
    this.intersections = this.ray.castCircle()

    // redraw
    this.draw()

    this.ray.setOrigin(this.player.x, this.player.y)
  }

  moveCharacter (path, enemy) {
    const tweens = []

    for (let i = 0; i < path.length - 1; i++) {
      const ex = path[i + 1].x
      const ey = path[i + 1].y

      tweens.push({
        targets: enemy,
        x: { value: ex * 300, duration: 2000 },
        y: { value: ey * 300, duration: 2000 }
      })
    }

    this.tweens.timeline({
      tweens: tweens
    })
  }

  moveCharacterBack (path, enemy) {
    const tweens = []

    for (let i = 0; i < path.length - 1; i++) {
      const ex = path[i + 1].x
      const ey = path[i + 1].y

      tweens.push({
        targets: enemy,
        x: { value: ex * 300, duration: 2000 },
        y: { value: ey * 300, duration: 2000 }
      })
    }

    this.tweens.timeline({
      tweens: tweens,
      onComplete: () => { enemy.updateState('GUARDING') }
    })
  }

  // draw rays intersections
  draw () {
  // clear ray visualisation
    this.graphics.clear()

    this.graphics.lineStyle(1, 0x00ff00)
    for (const intersection of this.intersections) {
      this.graphics.strokeLineShape({
        x1: this.ray.origin.x,
        y1: this.ray.origin.y,
        x2: intersection.x,
        y2: intersection.y
      })
    }

    this.graphics.fillStyle(0xff00ff)

    this.graphics.fillPoint(this.ray.origin.x, this.ray.origin.y, 3)
  }

  createFOV (scene) {
    this.maskGraphics = scene.add.graphics({ fillStyle: { color: 0xffffff, alpha: 0 } })
    this.mask = new Phaser.Display.Masks.GeometryMask(scene, this.maskGraphics)
    this.mask.setInvertAlpha()
    this.fow = scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.6 } }).setDepth(29)
    this.fow.setMask(this.mask)
    this.fow.fillRect(0, 0, 800, 600)
  }

  fixFlippedColliders (main) {
    const tileMapBodies = []
    const col = []

    main.layer.data.forEach((row) => {
      col.push(row.map((tile) => { return tile.index }))

      const allBodies = row.filter((tile) => tile.physics.matterBody) // Tiles with editing collision

      allBodies.forEach((tile) => { tileMapBodies.push(tile.physics.matterBody.body) })
      allBodies.filter((tile) => tile.index === 3 || (tile.physics.matterBody.body.label === 'Body' && (tile.rotation > 0 || tile.flipX || tile.flipY)))
        .forEach((tile) => {
          const matterBody = tile.physics.matterBody.body
          const rotationPoint = { x: tile.getCenterX(), y: tile.getCenterY() }
          if (tile.rotation > 0) {
            Phaser.Physics.Matter.Matter.Body.rotate(matterBody, tile.rotation, rotationPoint)
          }

          if (tile.flipX || tile.flipY || tile.index === 3) {
            Phaser.Physics.Matter.Matter.Body.scale(
              matterBody,
              (tile.flipX ? -1 : 1),
              (tile.flipY || tile.index === 3 ? -1 : 1),
              rotationPoint
            )
          }
        })
    })
    this.grid = col
    return tileMapBodies
  }
}

export default ExampleScene
