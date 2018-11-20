class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('logo', 'assets/sprites/logo.png');
    }

    create() {
        // Add Feralbyte's logo to the screen
        this.logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo');
        // Scalling Feralbyte's logo to half of its size.
        this.logo.setScale(0.5);

        // Just for the player look up at Feralbyte's logo
        //we are forcing 1 seconds of delay.
        this.time.delayedCall(1000, function() {
            // Launch splash screen
            //where the assets will be loaded.
            // To make this scene desappear before launch splash screen
            //just change the line this.scene.launch for this.scene.start.
            this.scene.launch('SplashScene');
        }, [], this);
    }

    update() {
        
    }
}