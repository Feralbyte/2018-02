class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('logo', 'assets/sprites/logo.png');
    }

    create() {
        // Add Feralbyte's logo to the screen
        let logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo');
        // Scalling Feralbyte's logo to half of its size.
        logo.setScale(0.5);
            
        // Launch splash screen
        this.scene.launch('SplashScene');
    }

    update() {
        
    }
}