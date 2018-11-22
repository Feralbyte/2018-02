class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');

        this.gameTitle = null;
        this.background = null;
        this.backgroundInitialPosition = null;
        this.menuOptions = [];
    }

    preload() {

    }

    create() {
        this.scene.remove('BootScene');
        
        this.createBackground();
        this.createGameTitle();
    }

    update() {
        this.updateBackgroundPosition();
    }

    createGameTitle() {
        this.gameTitle = this.add.text(screen.center.x, screen.top, 'The puzzle of Minos', textStyle.gameTitle);
        this.gameTitle.setOrigin(0.5, 0.5);
        this.gameTitle.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    }

    createBackground() {
        this.background = this.add.image(screen.center.x, screen.center.y, 'background-menu');
        this.background.setScale(0.25);
        
        this.backgroundInitialPosition = this.background.x;
    }

    updateBackgroundPosition() {
        if (this.background.x == this.backgroundInitialPosition) {
            this.background.x += 0.5;
        }
        else if(this.background.x == this.backgroundInitialPosition + 3) {
            this.background.x -= 0.5;
        }
    }

    createMenuOption() {
        this.index = this.menuOptions.length > 0 ? this.menuOptions.length : 0;

        
    }
}