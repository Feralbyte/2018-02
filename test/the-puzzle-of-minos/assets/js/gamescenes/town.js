class TownScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'TownScene',
            active: false
        })
    }

    init(data) {
        data.seaSound.stop();
        data.teseu.runSound.stop();
    }

    preload() {

    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.tilemap = this.make.tilemap({ key: 'tilemap-town' });

        this.tilemapTilesetGround = this.tilemap.addTilesetImage('grama', 'tileset-town-ground');
        this.tilemapTilesetRoad = this.tilemap.addTilesetImage('Estrada de terra- caminho', 'tileset-town-road');
        this.tilemapTilesetHouse = this.tilemap.addTilesetImage('Casa 1', 'tileset-town-house');

        this.tilemapLayerGround = this.tilemap.createStaticLayer('ground', this.tilemapTilesetGround);
        this.tilemapLayerRoad = this.tilemap.createStaticLayer('road', this.tilemapTilesetRoad);
        this.tilemapLayerHouse = this.tilemap.createStaticLayer('houses', this.tilemapTilesetHouse);
        this.tilemapLayerHouse.setCollisionByProperty({ collides: true });

        this.teseu = this.physics.add.sprite(50, 50, 'spritesheet-teseu', 15);
        this.teseu.speed = 100;
        this.teseu.body.collideWorldBounds = true;
        this.teseu.runSound = this.sound.add('run', {
            volume: 0.1
        });
        this.teseu.foundByProcusto = false;

        this.procusto = this.physics.add.sprite(232, 170, 'spritesheet-procusto', 0);
        this.procusto.setVisible(false);
        this.procusto.setCollideWorldBounds(true);
        //this.procusto.setImmovable(true);

        this.physics.add.collider(this.teseu, this.tilemapLayerHouse, this.onTeseuCollidedHouse, null, this);
        this.physics.add.collider(this.teseu, this.procusto, this.onTeseuCollidedProcusto, null, this);


        this.scene.launch('DialogScene', {
            textArray: ['AH, ENFIM EM CRETA, QUE TIPO DE AVENTURA IREMOS ENCONTRAR NESSAS TERRAS?'], 
            context: this
        });
        //createDialogBox(['AH, ENFIM EM CRETA, QUE TIPO DE AVENTURA IREMOS ENCONTRAR NESSAS TERRAS?'], this);

        this.battleStartSound = this.sound.add('explosion-1', {
            loop: false,
            volume: 0.08
        });
    }

    update() {
        if (this.teseu.active == true) {

            // Stop any previous movement from the last frame
            this.teseu.body.setVelocity(0);

            // Horizontal movement
            if (this.cursors.left.isDown) {
                this.teseu.body.setVelocityX(-this.teseu.speed);
                this.teseu.anims.play('left', true);
                if (!this.teseu.runSound.isPlaying) this.teseu.runSound.play();
            } else if (this.cursors.right.isDown) {
                this.teseu.body.setVelocityX(this.teseu.speed);
                this.teseu.anims.play('right', true);
                if (!this.teseu.runSound.isPlaying) this.teseu.runSound.play();
            }

            // Vertical movement
            else if (this.cursors.up.isDown) {
                this.teseu.body.setVelocityY(-this.teseu.speed);
                this.teseu.anims.play('up', true);
                if (!this.teseu.runSound.isPlaying) this.teseu.runSound.play();
            } else if (this.cursors.down.isDown) {
                this.teseu.body.setVelocityY(this.teseu.speed);
                this.teseu.anims.play('down', true);
                if (!this.teseu.runSound.isPlaying) this.teseu.runSound.play();
            }

            else {
                this.teseu.anims.stop();
                this.teseu.runSound.stop();
            }

            // Normalize and scale the velocity so that player can't move faster along a diagonal
            this.teseu.body.velocity.normalize().scale(this.teseu.speed);

            if (!this.teseu.foundByProcusto) {
                if (Math.abs(this.teseu.x - this.procusto.x) < 72
                    || Math.abs(this.teseu.y - this.procusto.y) < 72) {
                        this.procusto.setVisible(true);
                        this.physics.accelerateToObject(this.procusto, this.teseu, 25);
                }
            }
        }
    }

    onTeseuCollidedHouse(teseu, tilemapLayerHouse) {

    }

    onTeseuCollidedProcusto(teseu, procusto) {
        this.teseu.foundByProcusto = true;

        if (!this.battleStartSound.isPlaying) this.battleStartSound.play();
        
        this.cameras.main.shake(200);
        
        this.teseu.setVisible(false);
        this.procusto.setVisible(false);

        this.time.delayedCall(1000, () => {
            this.tilemapLayerHouse.setVisible(false);
            this.tilemapLayerRoad.setVisible(false);
            this.sound.stopAll();
            this.scene.pause();
            this.scene.launch('BattleScene');
        }, null, this);
    }
}