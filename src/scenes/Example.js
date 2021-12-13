import EasyStar from 'easystarjs/src/easystar'
import Phaser from 'phaser'

import CONFIG from '../config.js'
import Chest from '../spriteScripts/chest.js'

import PlayerClass from '../spriteScripts/player.js'
import RatEnemy from '../spriteScripts/rat.js'
import Trapdoor from '../spriteScripts/trapdoor.js'

class ExampleScene extends Phaser.Scene {
  create () {
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.music.stop()
    })
    this.input.mouse.disableContextMenu()
    const map = this.make.tilemap({ key: 'tutorialRoom' })
    const dungeon = map.addTilesetImage('til_set_dungeon01', 'dungeon')
    // const room = map.addTilesetImage('spr_tile_wall', 'wallTexture')
    // const bones = map.addTilesetImage('til_bones', 'bones')
    // const crates = map.addTilesetImage('til_crates, crates')
    // const crackedFloor = map.addTilesetImage('crackFloor')
    // Setup variables with world bounds
    const worldWidth = CONFIG.DEFAULT_WIDTH * 16
    const worldHeight = CONFIG.DEFAULT_HEIGHT * 2
    const backLayer = map.createLayer('collision', dungeon)
    const visualLayer = map.createLayer('visual', dungeon)
    // const visualLayer = map.createLayer('visual', dungeon)
    // const collisionLayer = map.createLayer('collision', { bones, crates, room })

    // backLayer.setVisible(false)
    // spawnLayer.setVisible(false)

    backLayer.setCollisionByExclusion([0, 1, 2, 3, 4, 20, 21, 22, 23, 24, 25, 26, 27, 28])
    this.matter.world.convertTilemapLayer(backLayer)
    this.tilemapBodies = this.fixFlippedColliders(backLayer)

    // Create the chests
    this.chestArray = []
    this.chest1 = new Chest(this, 4033, 14246, Chest.SIDE_CHEST, 'sword3', false)
    this.chest2 = new Chest(this, 3761, 10095, Chest.FRONT_CHEST, 'sword1', true)
    this.chest3 = new Chest(this, 1945, 10944, Chest.SIDE_CHEST, 'sword2', false)
    this.chest4 = new Chest(this, 1974, 8277, Chest.SIDE_CHEST, 'sword3', true)
    this.chest5 = new Chest(this, 4956, 5840, Chest.FRONT_CHEST, 'sword1', false)
    this.chest6 = new Chest(this, 2326, 6445, Chest.SIDE_CHEST, 'sword2', true)
    this.chest7 = new Chest(this, 7009, 13127, Chest.FRONT_CHEST, 'sword2', true)
    this.chest8 = new Chest(this, 9444, 7539, Chest.FRONT_CHEST, 'key', false)
    this.chest9 = new Chest(this, 9520, 3145, Chest.FRONT_CHEST, 'sword4', false)
    this.chest10 = new Chest(this, 13652, 4338, Chest.FRONT_CHEST, 'sword1', false)
    this.chest11 = new Chest(this, 13937, 4338, Chest.FRONT_CHEST, 'sword2', false)
    this.chest12 = new Chest(this, 13949, 5558, Chest.FRONT_CHEST, 'sword3', true)
    this.chest13 = new Chest(this, 13672, 5558, Chest.FRONT_CHEST, 'sword4', true)
    this.chest14 = new Chest(this, 14236, 4795, Chest.SIDE_CHEST, 'sword5', false)

    // Push them to the array
    this.chestArray.push(this.chest1)
    this.chestArray.push(this.chest2)
    this.chestArray.push(this.chest3)
    this.chestArray.push(this.chest4)
    this.chestArray.push(this.chest5)
    this.chestArray.push(this.chest6)
    this.chestArray.push(this.chest7)
    this.chestArray.push(this.chest8)
    this.chestArray.push(this.chest9)
    this.chestArray.push(this.chest10)
    this.chestArray.push(this.chest11)
    this.chestArray.push(this.chest12)
    this.chestArray.push(this.chest13)
    this.chestArray.push(this.chest14)

    // Create the player object
    this.player = new PlayerClass(this, 594, 14245)
    this.canRotate = true

    // Create trapdoor for victory
    this.trapdoor = new Trapdoor(this, 10936, 14523)
    // Create enemy objects in the scene
    // Enemies array that holds all enemies
    this.enemies = []
    this.activeEnemies = []
    this.activeEnemiesCounter = 0

    // Create the category used for tracking enemies
    const targetsCategory = this.matter.world.nextCategory()

    // Create the rat enemies
    const rat1 = new RatEnemy(this, 2862, 8259)
    this.enemies.push(rat1)

    const rat2 = new RatEnemy(this, 1095, 8191)
    this.enemies.push(rat2)

    const rat3 = new RatEnemy(this, 3756, 13941)
    this.enemies.push(rat3)

    const rat4 = new RatEnemy(this, 753, 11238)
    this.enemies.push(rat4)

    const rat5 = new RatEnemy(this, 6739, 12198)
    this.enemies.push(rat5)

    const rat6 = new RatEnemy(this, 6996, 11706)
    this.enemies.push(rat6)

    const rat7 = new RatEnemy(this, 5283, 11225)
    this.enemies.push(rat7)

    const rat8 = new RatEnemy(this, 6086, 12728)
    this.enemies.push(rat8)

    const rat9 = new RatEnemy(this, 9111, 9803)
    this.enemies.push(rat9)

    const rat10 = new RatEnemy(this, 6781, 8230)
    this.enemies.push(rat10)

    const rat11 = new RatEnemy(this, 7929, 7767)
    this.enemies.push(rat11)

    const rat12 = new RatEnemy(this, 8546, 7067)
    this.enemies.push(rat12)

    const rat13 = new RatEnemy(this, 8297, 6436)
    this.enemies.push(rat13)

    const rat14 = new RatEnemy(this, 9811, 4996)
    this.enemies.push(rat14)

    const rat15 = new RatEnemy(this, 9138, 4441)
    this.enemies.push(rat15)

    const rat16 = new RatEnemy(this, 19858, 4946)
    this.enemies.push(rat16)

    const rat17 = new RatEnemy(this, 12745, 4663)
    this.enemies.push(rat17)

    const rat18 = new RatEnemy(this, 13292, 4975)
    this.enemies.push(rat18)

    const rat19 = new RatEnemy(this, 10558, 6828)
    this.enemies.push(rat19)

    const rat20 = new RatEnemy(this, 11210, 6148)
    this.enemies.push(rat20)

    const rat21 = new RatEnemy(this, 10933, 8019)
    this.enemies.push(rat21)

    const rat22 = new RatEnemy(this, 11813, 7673)
    this.enemies.push(rat22)

    const rat23 = new RatEnemy(this, 12729, 8907)
    this.enemies.push(rat23)

    const rat24 = new RatEnemy(this, 11956, 9776)
    this.enemies.push(rat24)

    const rat25 = new RatEnemy(this, 11005, 9126)
    this.enemies.push(rat25)

    const rat26 = new RatEnemy(this, 11747, 12127)
    this.enemies.push(rat26)

    const rat27 = new RatEnemy(this, 10271, 12155)
    this.enemies.push(rat27)

    this.enemies.forEach(enemy => {
      enemy.setCollisionCategory(targetsCategory)
      enemy.canRotate = true
      // enemy.setOriginXY(enemy.x, enemy.y)

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

    // Load and play background music
    this.music = this.sound.addAudioSprite('gameAudio')
    this.music.play('Keep')
    this.music.loop = true
    this.fightSong = this.sound.addAudioSprite('gameAudio')
    this.fightSong.play('prevail')
    this.fightSong.setVolume(0)
    this.fightSong.loop = true

    // Create a sound instance for sfx
    this.sfx = this.sound.addAudioSprite('gameAudio')

    // Set the HUD for the game
    this.scene.run('HUDScene', { music: this.music, sfx: this.sfx })
    this.HUD = this.scene.get('HUDScene')
    this.activeTileBodies = this.matter.query.region(this.tilemapBodies, this.cameraBody.bounds)

    // for (const wall of this.activeTileBodies) {
    //   this.activeWallGroup.add(wall)
    // }

    // EasyStar Pathfinding
    this.finder = new EasyStar.js()

    this.finder.setGrid(this.grid)
    this.finder.setAcceptableTiles([2, 3])
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
      this.activeEnemiesCounter++
      const target = collisionInfo.bodyA.label === 'phaser-raycaster-ray-body' ? collisionInfo.bodyB.gameObject : collisionInfo.bodyA.gameObject
      target.updateState('PURSUING')
    })

    this.ray.setOnCollideEnd((collisionInfo) => {
      this.activeEnemiesCounter--
      const target = collisionInfo.bodyA.label === 'phaser-raycaster-ray-body' ? collisionInfo.bodyB.gameObject : collisionInfo.bodyA.gameObject
      target.updateState('RETURNING')
    })

    this.intersections = this.ray.castCircle()

    this.graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x00ff00 }, fillStyle: { color: 0xffffff, alpha: 0.3 } })

    // player look
    this.cursors = this.input.keyboard.createCursorKeys()
    this.cursors = this.input.keyboard.addKeys(
      {
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        open: Phaser.Input.Keyboard.KeyCodes.E,
        getLocation: Phaser.Input.Keyboard.KeyCodes.O
      })

    this.cursors.open.on('down', this.tryOpen, this)

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

    this.AttackAudioIsPlaying = false

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

    if (this.cursors.getLocation.isDown) {
      console.log(this.player.x, this.player.y)
    }

    if (this.player.getHealth() <= 0) {
      this.scene.stop('HUDScene')
      this.scene.stop()
      this.scene.start('GameOverScene')
    }

    // if (this.cursors.open.isDown) {
    //   if (this.chestArray) {
    //     this.chestArray.forEach((chest) => {
    //       if (Phaser.Math.Distance.Between(this.player.x, this.player.y, chest.x, chest.y) <= 270 && !chest.isOpen()) {
    //         chest.onOpen()
    //       }
    //       if (chest.getAnimationEnded() && Phaser.Math.Distance.Between(this.player.x, this.player.y, chest.x, chest.y) <= 270) {
    //         const sword = chest.getChestLoot()
    //         switch (sword) {
    //           case 'sword1':
    //             this.HUD.changeWeapon(1)
    //             break
    //           case 'sword2':
    //             this.HUD.changeWeapon(2)
    //             break
    //           case 'sword3':
    //             this.HUD.changeWeapon(3)
    //             break
    //           case 'sword4':
    //             this.HUD.changeWeapon(4)
    //             break
    //           case 'sword5':
    //             this.HUD.changeWeapon(5)
    //             break
    //           default:
    //             this.player.setHasKey()
    //             break
    //         }
    //         this.HUD.changeWeapon(3)
    //         chest.emptyChest()
    //       }
    //     })
    //   }
    // }

    if (this.activeEnemiesCounter > 0 && this.AttackAudioIsPlaying === false) {
      this.tweens.add({
        targets: this.fightSong,
        volume: 1,
        duration: 500
      })
      this.tweens.add({
        targets: this.music,
        volume: 0.5,
        duration: 500
      })
      this.AttackAudioIsPlaying = true
    }

    if (this.activeEnemiesCounter === 0) {
      this.tweens.add({
        targets: this.fightSong,
        volume: 0,
        duration: 500
      })
      this.tweens.add({
        targets: this.music,
        volume: 1,
        duration: 500
      })
      this.AttackAudioIsPlaying = false
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
        if (enemy.getState() === 'DYING') {
          enemy.updateAI(deltaTime)
        } else if (enemy) {
          enemy.updateAI(deltaTime)
          const enemyAngle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y)
          enemy.setAngle((Phaser.Math.RAD_TO_DEG * enemyAngle) + 90)
        }
      })
    }

    // cast ray in all directions
    this.intersections = this.ray.castCircle()

    // redraw
    if (__DEV__) {
      // this.draw()
    }

    this.ray.setOrigin(this.player.x, this.player.y)
  }

  tryOpen () {
    if (!Array.isArray(this.chestArray)) { return }
    if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.trapdoor.x, this.trapdoor.y) <= 270 && !this.trapdoor.getOpened() && this.player.getHasKey()) {
      this.trapdoor.setOpened()
    } else if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.trapdoor.x, this.trapdoor.y) <= 270 && this.trapdoor.getOpened()) {
      console.log('winner')
    }
    this.chestArray.forEach((chest) => {
      if (Phaser.Math.Distance.Between(this.player.x, this.player.y, chest.x, chest.y) <= 270 && !chest.isOpen()) {
        chest.onOpen()
      }
      if (chest.getAnimationEnded() && Phaser.Math.Distance.Between(this.player.x, this.player.y, chest.x, chest.y) <= 270) {
        const sword = chest.getChestLoot()
        switch (sword) {
          case 'sword1':
            this.HUD.changeWeapon(1)
            break
          case 'sword2':
            this.HUD.changeWeapon(2)
            break
          case 'sword3':
            this.HUD.changeWeapon(3)
            break
          case 'sword4':
            this.HUD.changeWeapon(4)
            break
          case 'sword5':
            this.HUD.changeWeapon(5)
            break
          default:
            this.player.setHasKey()
            break
        }
        chest.emptyChest()
      }
    })
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
    this.fow.fillRect(0, 0, 1000, 800)
  }

  fixFlippedColliders (main) {
    const tileMapBodies = []
    const col = []

    main.layer.data.forEach((row) => {
      col.push(row.map((tile) => { return tile.index }))

      const allBodies = row.filter((tile) => tile.physics.matterBody) // Tiles with editing collision

      allBodies.filter((tile) => tile.index === 7 || (tile.physics.matterBody.body.label === 'Body' && (tile.rotation > 0 || tile.flipX || tile.flipY)))
        .forEach((tile) => {
          const matterBody = tile.physics.matterBody.body
          const rotationPoint = { x: tile.getCenterX(), y: tile.getCenterY() }
          tileMapBodies.push(matterBody)
          if (tile.rotation > 0) {
            Phaser.Physics.Matter.Matter.Body.rotate(matterBody, tile.rotation, rotationPoint)
          }

          if (tile.flipX || tile.flipY || tile.index === 7) {
            Phaser.Physics.Matter.Matter.Body.scale(
              matterBody,
              (tile.flipX ? -1 : 1),
              (tile.flipY || tile.index === 7 ? -1 : 1),
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
