class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('logo', 'assets/sprites/logo.png');
    }

    create() {
        // Add Feralbyte's logo to the screen
        this.logo = this.add.image(screen.center.x, screen.center.y, 'logo');
        // Scalling Feralbyte's logo to half of its size.
        this.logo.setScale(0.5);
            
        this.time.delayedCall(2000, function(){
            // Launch splash screen
            this.scene.launch('SplashScene');
        }, [], this);
        
    }

    update() {
        
    }
}