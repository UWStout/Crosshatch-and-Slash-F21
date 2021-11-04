import Phaser from 'phaser'

import CONFIG from '../config.js'

import PlayerClass from '../spriteScripts/player.js'
import RatEnemy from '../spriteScripts/rat.js'

class ExampleScene extends Phaser.Scene {
  preload () {
    // Loading is done in 'StartScene'
    // - 'sky' is background image
    // - 'red' is our particle
    // - 'logo' is the phaser3 logo
  }

  create () {
    const map = this.make.tilemap({ key: 'tutorialRoom' })
    const room = map.addTilesetImage('spr_tile_wall', 'wallTexture')
    // Setup variables with world bounds
    const worldWidth = CONFIG.DEFAULT_WIDTH * 16
    const worldHeight = CONFIG.DEFAULT_HEIGHT * 2
    const backLayer = map.createLayer('til_map', room)
    const spawnLayer = map.createLayer('til_spawn', room)
    backLayer.setCollisionBetween(3, 6)
    this.matter.world.convertTilemapLayer(backLayer)
    const tilemapBodies = this.fixFlippedColliders(backLayer)
    // Create the player object
    this.player = new PlayerClass(this, 7000, 1500)
    this.canRotate = true
    this.enemy = new RatEnemy(this, 8000, 1500)
    this.enemy.canRotate = true
    const cat1 = this.matter.world.nextCategory()
    const cat2 = this.matter.world.nextCategory()
    this.enemy.setCollisionCategory(cat1)
    this.player.setCollisionCategory(cat1)
    this.enemy.setCollidesWith([cat1, cat2])
    this.enemy.setOnCollideWith(this.player, function collide (gameObject) {
      console.log('Collided with enemy')
    })
    this.matter.world.on('collisionstart', function (event) {
      const pairs = event.pairs
      const playerBody = ''
      const colliderBody = ''
      const body1 = pairs[0]
      const body2 = pairs[1]
      for (let i = 0; i < pairs.length; i++) {
        if (pairs[i].isSensor) {
          if (body1.isSensor) {
            const playerBody = body1
            const colliderBody = body2
          }
          else if (body2.isSensor) {
            const playerBody = body2
            const colliderBody = body1
          }
          const playerSprite = playerBody.gameObject
          const colliderSprite = colliderBody.gameObject
          console.log(colliderSprite)
          console.log(playerBody.gameObject)
          console.log(playerBody)
        }
      }
    })
    // this.player.setOnCollide(function (gameObject) {
    //   if (gameObject === this.enemy) {
    //     console.log('enemy attacked you')
    //   }
    // })
    // Play sound when we hit the world bounds
    this.matter.world.on('worldbounds', () => { this.sfx.play('hitSound') }, this)

    // Adjust world bounds for physics and camera
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.player, false, 0.1)

    // RAYCAST VARIABLES
    
    this.raycaster = this.raycasterPlugin.createRaycaster()
    this.ray = this.raycaster.createRay({
      origin: {
        x: 400,
        y: 300
      }
    })

    // this.raycaster.mapGameObjects(tilemapBodies)

    this.intersections = this.ray.castCircle()
    this.graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x00ff00 }, fillStyle: { color: 0xffffff, alpha: 0.3 } })

    this.createFOV(this)

    this.fow.setDepth(1)
    // backLayer.setDepth(2)
    this.graphics.setDepth(3)

    // this.draw()

    // player look
    this.cursors = this.input.keyboard.createCursorKeys()
    this.cursors = this.input.keyboard.addKeys(
      {
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
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
    // Add a callback when a key is released
    // this.input.keyboard.on('keyup', this.keyReleased, this)

    // Load and play background music
    this.music = this.sound.addAudioSprite('gameAudio')
    this.music.play('freeVertexStudioTrack2')

    // Create a sound instance for sfx
    this.sfx = this.sound.addAudioSprite('gameAudio')
    this.scene.run('HUDScene')

    this.input.on('pointermove', function (pointer) {
      this.point.set(pointer.worldX, pointer.worldY)
      // console.log('x: ' + (this.point.x) + ' Y: ' + this.point.y)
      this.point.x -= this.player.x
      this.point.y -= this.player.y
      this.angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.player.x + this.point.x, this.player.y + this.point.y)
      // console.log(this.angle)
      if (this.canRotate) {
        this.player.setAngle((Phaser.Math.RAD_TO_DEG * this.angle) + 90)
      }
    }, this)

    this.input.on('pointerup', (pointer) => {
      if (pointer.leftButtonReleased()) {
        this.canRotate = false
        this.player.attack()
      }

      if (pointer.rightButtonReleased()) {
        this.player.magicAttack(this.point.x, this.point.y)
      }

      setTimeout(() => {
        this.canRotate = true
      }, 625)
    }, this)
  }

  keyReleased () {
    console.log('Key released')
    this.scene.start('StartScene')
    this.scene.stop('HUDScene')
    this.music.stop()
  }

  update () {
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

    this.player.move(directon.x, directon.y)

    // cast ray in all directions
    this.intersections = this.ray.castCircle()
    // redraw
    // this.draw()

    this.ray.setOrigin(this.player.x, this.player.y)
  }

  // draw rays intersections
  draw () {
  // clear ray visualisation
    this.graphics.clear()

    // clear field of view mask
    this.maskGraphics.clear()
    // draw fov mask
    this.maskGraphics.fillPoints(this.intersections)

    /*
  graphics.fillStyle(0xffffff, 0.3);
  graphics.fillPoints(intersections);
  */
    // draw rays
    this.graphics.lineStyle(1, 0x00ff00)
    for (const intersection of this.intersections) {
      this.graphics.strokeLineShape({
        x1: this.ray.origin.x,
        y1: this.ray.origin.y,
        x2: intersection.x,
        y2: intersection.y
      })
    }
    /*
  let raycasterMap = tilemapLayer.data.get('raycasterMap');
  //draw tilemap's segments
  graphics.lineStyle(1, 0xff0000);
  let segments = raycasterMap.getSegments(ray);
  for(let segment of segments) {
    graphics.strokeLineShape(segment);
  }
  */
    this.graphics.fillStyle(0xff00ff)
    /*
  //draw tilemap's points
  let points = raycasterMap.getPoints(ray);
  for(let point of points) {
    graphics.fillPoint(point.x, point.y, 3);
  }
  */
    // draw ray origin
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
    main.layer.data.forEach((row) => {
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
    return tileMapBodies
  }
}

export default ExampleScene
