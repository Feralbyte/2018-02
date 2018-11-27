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

        this.boat = this.physics.add.sprite(40, screen.center.y, 'boat');
        this.boat.angle = 90;
        this.boat.speed = 30;
        this.boat.collidedWithBridge = false;

        this.teseu = this.physics.add.sprite(this.boat.x + 8, this.boat.y, 'spritesheet-teseu', 15);
        this.teseu.setScale(0.6);

        this.tilemapLayerBridge.setCollisionByProperty({ bridge: true });
        this.physics.add.collider(this.boat, this.tilemapLayerBridge, this.onBoatCollidedBridge, null, this);
        //this.physics.add.overlap(this.boat, this.tilemapLayerBridge, this.onBoatOverlapsBridge, null, this);
    }

    update(time, delta) {
        if (!this.boat.collidedWithBridge) {
            this.boat.body.setVelocityX(this.boat.speed);
            this.teseu.x = this.boat.x + 8;
        }
        else {
            
            
        }
    }

    onBoatCollidedBridge(boat, tilemapLayerBridge) {
        this.boat.collidedWithBridge = true;

        this.teseu.y = screen.center.y;
        this.teseu.x = screen.center.x - 10;
        this.teseu.setScale(1);

        this.cameras.main.startFollow(this.teseu);
    }
}