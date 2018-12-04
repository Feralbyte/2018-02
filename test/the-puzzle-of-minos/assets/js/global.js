class Screen {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.center = {
            x: 0,
            y: 0
        };
        this.top = 30;
    }

    calcDimensions() {
        let canvas = document.querySelector('canvas');

        if (canvas != null) {
            this.width = canvas.style.width.toString().replace('px', '');
            this.height = canvas.style.height.toString().replace('px', '');

            this.center.x = this.width / 2;
            this.center.y = this.height / 2;
        }
    }
}

class DialogScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'DialogScene',
            active: false
        })
    }

    init(data) {
        this.data = data;
    }

    create() {
        this.createDialogBox(this.data.textArray, this.data.context);
    }

    createDialogBox(textArray, context) {
        let x = 16;
        let y = 350;
        let width = screen.width - 32;
        let height = 236;
    
        let textIndex = 0;

        let sound = this.sound.add('collect11', {
            loop: false,
            volume: 0.2
        });
        sound.play();
    
        context.scene.pause();
        this.graphics = this.add.graphics();
    
        this.graphics.fillStyle('0x636e72', '0.5');
        this.graphics.fillRect(x + 1, y + 1, width - 1, height - 1);
    
        this.graphics.lineStyle(1, '0xffeaa7', '0.5');
        this.graphics.strokeRect(x, y, width, height);
    
        let dialogContent = this.make.text({
            x: x + 16,
            y: y + 16,
            text: textArray[textIndex],
            style: {
                font: 'bold 16px Arial',
                fill: '#fdcb6e'
            }
        });
    
        let btnClose = this.make.text({
            x: width - 4,
            y: y + 4,
            text: 'x',
            style: {
                font: 'bold 12px Arial',
                fill: '#ffeaa7' // border color
            }
        });
        btnClose.setInteractive();
        btnClose.on('pointerup', () => {
            this.graphics.setVisible(false);
            btnClose.setVisible(false);
            btnSkipText.setVisible(false);
            dialogContent.setVisible(false);
            context.scene.resume();
            sound.play();
            this.scene.destroy();
        });
    
        let btnSkipText = this.make.text({
            x: width - 32,
            y: y + height - 16,
            text: 'skip >>',
            style: {
                fontWeight: 'bold',
                fontFamily: 'Arial',
                fontSize: '12px',
                color: '#ffeaa7'
            }
        });
        btnSkipText.setInteractive();
        btnSkipText.on('pointerover', () => {
            btnSkipText.setStyle({
                fontWeight: 'bold',
                fontFamily: 'Arial',
                fontSize: '12px',
                color: '#fdcb6e'
            });
        });
        btnSkipText.on('pointerout', () => {
            btnSkipText.setStyle({
                fontWeight: 'bold',
                fontFamily: 'Arial',
                fontSize: '12px',
                color: '#ffeaa7'
            });
        });
        btnSkipText.on('pointerup', () => {
            if (++textIndex < textArray.length) {
                //textIndex++;
    
                dialogContent.setText(textArray[textIndex]);
            } else {
                this.graphics.setVisible(false);
                btnClose.setVisible(false);
                btnSkipText.setVisible(false);
                dialogContent.setVisible(false);
                context.scene.resume();
                sound.play();
                this.scene.destroy();
            }
        });
    }
};

class BattleScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BattleScene',
            active: false
        });
    }

    init() {
        //this.sound.stopAll();        
    }

    preload() {

    }

    create() {
        this.soundtrack = this.sound.add('soundtrack-intro', {
            loop: true,
            volume: 0.2
        });
        this.soundtrack.play();

        this.createBattleUI();

        
    }

    createBattleUI() {
        let arena = {
            x: 8,
            width: 784,
            y: 8,
            height: 364,
            color: '0x636e72',
            alpha: '0.5',
            lineColor: '0xffeaa7', 
            line: 1            
        }

        let playerCorner = {
            x: arena.x,
            width: 256,
            y: 8 * 2 + arena.height,
            height: 312,
            color: '0x636e72',
            alpha: '0.5',
            lineColor: '0xffeaa7', 
            line: 1 
        }

        let actionMenu = {
            x: 8 * 2 + playerCorner.width,
            width: 256,
            y: 8 * 2 + arena.height,
            height: 312,
            color: '0x636e72',
            alpha: '0.5',
            lineColor: '0xffeaa7', 
            line: 1 
        }

        let enemyCorner = {
            x: 8 * 3 + actionMenu.width * 2,
            width: 256,
            y: 8 * 2 + arena.height,
            height: 312,
            color: '0x636e72',
            alpha: '0.5',
            lineColor: '0xffeaa7', 
            line: 1 
        }
    
        // Battle arena
        this.arena = this.add.graphics();
        
        this.arena.fillStyle(arena.color, arena.alpha);
        this.arena.fillRect(arena.x + arena.line, arena.y + arena.line, arena.width - arena.line, arena.height - arena.line);
    
        this.arena.lineStyle(arena.line, arena.lineColor, arena.alpha);
        this.arena.strokeRect(arena.x, arena.y, arena.width, arena.height);

        // Player  corner
        this.playerCorner = this.add.graphics();

        this.playerCorner.fillStyle(playerCorner.color, playerCorner.alpha);
        this.playerCorner.fillRect(playerCorner.x + playerCorner.line, playerCorner.y + playerCorner.line, playerCorner.width - playerCorner.line, playerCorner.height - playerCorner.line);
    
        this.playerCorner.lineStyle(playerCorner.line, playerCorner.lineColor, playerCorner.alpha);
        this.playerCorner.strokeRect(playerCorner.x, playerCorner.y, playerCorner.width, playerCorner.height);

        // Action  menu
        this.actionMenu = this.add.graphics();

        this.actionMenu.fillStyle(actionMenu.color, actionMenu.alpha);
        this.actionMenu.fillRect(actionMenu.x + actionMenu.line, actionMenu.y + actionMenu.line, actionMenu.width - actionMenu.line, actionMenu.height - actionMenu.line);
    
        this.actionMenu.lineStyle(actionMenu.line, actionMenu.lineColor, actionMenu.alpha);
        this.actionMenu.strokeRect(actionMenu.x, actionMenu.y, actionMenu.width, actionMenu.height);

        // Enemy  corner
        this.enemyCorner = this.add.graphics();

        this.enemyCorner.fillStyle(enemyCorner.color, enemyCorner.alpha);
        this.enemyCorner.fillRect(enemyCorner.x + enemyCorner.line, enemyCorner.y + enemyCorner.line, enemyCorner.width - enemyCorner.line, enemyCorner.height - enemyCorner.line);
    
        this.enemyCorner.lineStyle(enemyCorner.line, enemyCorner.lineColor, enemyCorner.alpha);
        this.enemyCorner.strokeRect(enemyCorner.x, enemyCorner.y, enemyCorner.width, enemyCorner.height);

        this.teseu = this.physics.add.sprite(arena.width / 2 - 128, arena.height / 2 + 64, 'spritesheet-teseu', 4);
        this.teseu.setScale(4);

        this.teseu = this.physics.add.sprite(arena.width / 2 + 128, arena.height / 2 - 64, 'spritesheet-procusto', 0);
        this.teseu.setScale(4);
    }
}

const textStyle = {
    gameTitle: {
        font: '44pt Concert One',
        fill: '#ffeaa7',
        align: 'center'
    },
    menuOption: {
        fontSize: '44px',
        fontFamily: 'Concert One',
        fill: '#ffeaa7',
        hover: {
            fill: '#ffffff'
        }
    },
    loadingTitle: {
        font: '14px monospace',
        fill: '#ffffff'
    },
    loadingText: {
        font: '12px monospace',
        fill: '#f2f2f2'
    },
    loadingAsset: {
        font: '12px monospace',
        fill: '#aaaaaa'
    },
    optionsText: {
        font: 'bold 60pt Concert One',
        fill: '#FDFFB5',
        align: 'center'
    }
};
