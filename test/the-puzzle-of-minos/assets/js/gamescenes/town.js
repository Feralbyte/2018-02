class TownScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'TownScene',
            active: false
        })
    }

    preload() {

    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.tilemap = this.make.tilemap({ key: 'tilemap-town' });

        this.tilemapTilesetGround = this.tilemap.addTilesetImage('grama', 'tileset-town-ground');
        this.tilemapTilesetRoad = this.tilemap.addTilesetImage('Estrada de terra- caminho', 'tileset-town-road');
        this.tilemapTilesetHouse = this.tilemap.addTilesetImage('Casa 1', 'tileset-town-house');
        this.tilemapTilesetMinosMansion = this.tilemap.addTilesetImage('Mans\u00e3o Minos', 'tileset-town-minos-mansion');

        this.tilemapLayerGround = this.tilemap.createStaticLayer('ground', this.tilemapTilesetGround);
        this.tilemapLayerRoad = this.tilemap.createStaticLayer('road', this.tilemapTilesetRoad);

        this.tilemapLayerHouse = this.tilemap.createStaticLayer('houses', this.tilemapTilesetHouse);
        this.tilemapLayerHouse.setCollisionByProperty({ collides: true });
        
        //this.tilemapLayerMinosMansion = this.tilemap.createStaticLayer('Mans\u00e3o Minos', this.tilemapTilesetMinosMansion);
        //this.tilemapLayerMinosMansion.setCollisionByProperty({ collides: true });

        this.teseu = this.physics.add.sprite(50, 100, 'spritesheet-teseu', 15);
        this.anims.create({
            key: 'idle',
            frames: [ { key: 'spritesheet-teseu', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('spritesheet-teseu', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('spritesheet-teseu', { start: 4, end: 7 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('spritesheet-teseu', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('spritesheet-teseu', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.teseu, this.tilemapLayerHouse, this.onTeseuCollidedHouse, null, this);
        this.physics.add.collider(this.teseu, this.tilemapLayerMinosMansion, this.onTeseuCollidedMinosMansion, null, this);
    }

    update() {
        // Stop any previous movement from the last frame
        this.teseu.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.teseu.body.setVelocityX(-this.teseu.speed);
            this.teseu.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.teseu.body.setVelocityX(this.teseu.speed);
            this.teseu.anims.play('right', true);
        }

        // Vertical movement
        else if (this.cursors.up.isDown) {
            this.teseu.body.setVelocityY(-this.teseu.speed);
            this.teseu.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            this.teseu.body.setVelocityY(this.teseu.speed);
            this.teseu.anims.play('down', true);
        }

        else {
            this.teseu.anims.stop();
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.teseu.body.velocity.normalize().scale(this.teseu.speed);
    }

    onTeseuCollidedHouse(teseu, tilemapLayerHouse) {

    }

    onTeseuCollidedMinosMansion(teseu, tilemapLayerMinosMansion) {

    }
}