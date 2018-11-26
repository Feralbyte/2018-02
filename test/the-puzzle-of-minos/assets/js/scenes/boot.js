class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        screen.calcDimensions();

        this.load.image('logo', 'assets/sprites/logo.png');
    }

    create() {
        // Launch splash screen
        this.scene.launch('SplashScene');
    }

    update() {
        
    }
}