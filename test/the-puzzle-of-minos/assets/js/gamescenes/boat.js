class BoatScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BoatScene',
            active: false
        });
    }

    init() {
        this.scene.remove('MenuScene');
    }

    preload() {

    }

    create() {
        this.water = this.add.tileSprite(screen.width / 2, screen.height / 2, screen.width, screen.height, 'water');
        
        this.boat = this.add.sprite(screen.center.x, screen.height, 'boat');
        this.boat.hasArrived = false;
        this.boat.speed = 0.6;

        this.teseu = this.add.sprite(this.boat.x + 2, this.boat.y - 15, 'spritesheet-teseu', 4);
        this.teseu.setScale(0.6);
    }

    update() {
        if (this.boat.y > 0) {
            this.teseu.y = (this.boat.y -= this.boat.speed) - 15;
        }
        else {
            this.boat.hasArrived = true;
        }

        if (this.boat.hasArrived) {
            this.scene.start('HarbourScene');
        }
    }
}