class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');

        this.gameTitle = null;
        this.background = null;
        this.backgroundInitialPosition = null;
        this.menuOptions = [];
    }

    init() {
        this.scene.remove('BootScene');
    }

    preload() {

    }

    create() {
        this.createBackground();
        this.createGameTitle();
        
        this.createMenuOption('Play', 'BoatScene', this);
        this.createMenuOption('Options', 'OptionsScene', this);
        this.createMenuOption('Credits', 'CreditsScene', this);
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
        this.background.setScale(0.5);
        
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

    createMenuOption(optionText, targetScene, caller) {
        this.index = this.menuOptions.length > 0 ? this.menuOptions.length : 0;

        let menuOption = {
            x: 96,
            y: this.index == 0 ? screen.height - 240 : this.menuOptions[this.index - 1].y + 48,
            text: optionText,
            style: textStyle.menuOption
        }

        let text = this.make.text(menuOption);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text.setInteractive();    

        text.on('pointerdown', () => { 
            caller.scene.launch(targetScene); 
        });

        text.on('pointerover', () => { 
            text.setStyle(textStyle.menuOption.hover);
        });

        text.on('pointerout', () => {
             text.setStyle(textStyle.menuOption); 
        });

        this.menuOptions.push(menuOption);
    }
}