class BoatScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BoatScene',
            active: false
        });
    }

    init(data) {
        this.menuSoundtrack = data.soundtrack;
    }

    preload() {
        
    }

    create() {
        this.water = this.add.tileSprite(screen.width / 2, screen.height / 2, screen.width, screen.height, 'water');
        
        this.boat = this.add.sprite(screen.center.x, screen.height, 'boat');
        this.boat.hasArrived = false;
        this.boat.speed = 0.8;

        this.teseu = this.add.sprite(this.boat.x + 2, this.boat.y - 15, 'spritesheet-teseu', 4);
        this.teseu.setScale(0.6);

        this.seaSound = this.sound.add('sea', {
            loop: true,
            volume: 0.2
        });
        this.seaSound.play();

        //createDialogBox(['Oi, meu nome é Eduardo Messias.'], this);
    }

    update() {
        if (this.boat.y > 0) {
            this.teseu.y = (this.boat.y -= this.boat.speed) - 15;
        }
        else {
            this.boat.hasArrived = true;
        }

        if (this.boat.hasArrived) {
            this.scene.start('HarbourScene', this);
        }
    }

    createDialogBox(textArray) {
        let x = 16;
        let y = 350;
        let width = screen.width - 32;
        let height= 236;

        let textIndex = 0;
        
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
            }
            else {
                this.graphics.setVisible(false);
                btnClose.setVisible(false);
                btnSkipText.setVisible(false);
                dialogContent.setVisible(false);
            }
        });
    }
}