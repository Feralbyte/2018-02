class HarbourScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'HarbourScene',
            active: false
        })
    }

    init() {
        this.scene.remove('BoatScene');
    }

    preload() {

    }

    create() {
        this.tilemap = this.make.tilemap({ key: 'tilemap-harbour' });

        this.tilemapTilesetWater = this.tilemap.addTilesetImage('agua', 'tileset-harbour-water');
        this.tilemapTilesetBridge = this.tilemap.addTilesetImage('Ponte', 'tileset-harbour-bridge');
        this.tilemapTilesetHouse = this.tilemap.addTilesetImage('Casa 1', 'tileset-harbour-house');

        this.tilemapLayerWater = this.tilemap.createStaticLayer('water', this.tilemapTilesetWater);
        this.tilemapLayerBridge = this.tilemap.createStaticLayer('bridge', this.tilemapTilesetBridge);
        this.tilemapLayerHouse = this.tilemap.createStaticLayer('houses', this.tilemapTilesetHouse);

        this.boat = this.physics.add.sprite(0, screen.center.y, 'boat');
        this.boat.rotation = 1.572;
        this.boat.speed = 0.5;
        this.boat.collidesWithBridge = false;

        this.teseu = this.physics.add.sprite(this.boat.x + 8, this.boat.y, 'spritesheet-teseu', 15);
        this.teseu.setScale(0.6);

        this.tilemapLayerBridge.setCollisionByExclusion([], true);

        this.physics.add.collider(this.tilemapLayerBridge, this.boat, function(){
            this.boat.collidesWithBridge = true;
        }, null, this);
        this.physics.add.collider(this.tilemapLayerWater, this.teseu);
    }

    update() {
        if (!this.boat.collidesWithBridge) {
            this.teseu.x = (this.boat.x += this.boat.speed) + 8;
        }
    }
}