class OptionsScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'OptionsScene',
            active: false
        });
    }

    preload() {
        this.titleText = game.make.text(game.world.centerX, 100, "Game Title", {
            font: 'bold 60pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
          });
          this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
          this.titleText.setOrigin(0.5, 0.5);
          this.optionCount = 1;
    }

    create() {
        var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic;

        game.add.sprite(0, 0, 'options-bg');
        game.add.existing(this.titleText);
        
        this.createMenuOption('Mute music', (target) => {
            playMusic = !playMusic;
            target.text = playMusic ? 'Mute Music' : 'Play Music';
            
            musicPlayer.volume = playMusic ? 1 : 0;
        });

        this.createMenuOption(playSound ? 'Mute Sound' : 'Play Sound', (target) => {
            playSound = !playSound;

            target.text = playSound ? 'Mute Sound' : 'Play Sound';
        });

        this.createMenuOption('<- Back', () => {
            this.scene.start("MenuScene");
        });
    }

    update() {
        
    }

    createMenuOption(optionText, callback) {
        this.index = this.menuOptions.length > 0 ? this.menuOptions.length : 0;

        let menuOption = {
            x: screen.center.x,
            y: this.index == 0 ? screen.height - 240 : this.menuOptions[this.index - 1].y + 48,
            text: optionText,
            style: textStyle.menuOption
        }

        let text = this.make.text(menuOption);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text.setOrigin(0.5, 0.5);
        text.setInteractive(); 

        text.on('pointerdown', callback);

        text.on('pointerover', () => { 
            text.setStyle(textStyle.menuOption.hover);
        });

        text.on('pointerout', () => {
             text.setStyle(textStyle.menuOption); 
        });

        this.menuOptions.push(menuOption);

        return text;
    }
}