class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    init() {
        
    }

    preload() {

    }

    create() {
        this.background = this.add.image(screen.center.x, screen.center.y, 'background-menu');
        this.gameTitle = this.add.image(screen.center.x, screen.height * 0.2, 'gametitle');
        
        this.newGame = this.add.image(screen.center.x, screen.center.y, 'btnnewgame');
        this.newGame.setScale(0.8);
        this.newGame.setInteractive();
        this.newGame.on('pointerover', () => {
            this.newGame.setScale(1);
        });
        this.newGame.on('pointerout', () => {
            this.newGame.setScale(0.8);
        });
        this.newGame.on('pointerup', () => {
            this.scene.start('BoatScene', this);
        });

        this.credits = this.add.image(screen.center.x, screen.center.y + 100, 'btncredits');
        this.credits.setScale(0.7);
        this.credits.setInteractive();
        this.credits.on('pointerover', () => {
            this.credits.setScale(0.8);
        });
        this.credits.on('pointerout', () => {
            this.credits.setScale(0.7);
        });
        this.credits.on('pointerup', () => {
            //this.scene.start('CreditsScene');
        });

        this.sound.pauseOnBlur = false;
        this.soundtrack = this.sound.add('soundtrack-menu', {
            loop: true,
            volume: 0.5
        });
        this.soundtrack.play();
    }

    update() {
        
    }
}