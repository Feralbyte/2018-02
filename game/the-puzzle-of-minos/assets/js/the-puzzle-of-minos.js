let game;
let gameOptions = {

}

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        width: 340,
        height: 480,
        backgroundColor: 0x000000,
        scene: TheseuShipArrives
    }

    game = new Phaser.Game(gameConfig);

    window.focus();
    resize();

    window.addEventListener("resize", resize, false);
}

function resize() {
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;

    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

class TheseuShipArrives extends Phaser.Scene {
    constructor() {
        super("TheseuShipArrives");

        //  The Google WebFont Loader will look for this object, so create it before loading the script.
        this.webFontConfig = {

            //  'active' means all requested fonts have finished loading
            //  We set a 1 second delay before calling 'createText'.
            //  For some reason if we don't the browser cannot render the text the first time it's created.
            active: function() { this.time.events.add(Phaser.Timer.SECOND * 3, this.createText, this); },

            //  The Google Fonts we want to load (specify as many as you like in the array)
            google: {
                families: ['VT323']
            }

        };
    }

    preload() {
        this.load.spritesheet('teseu', '/assets/spritesheet/theseu.png', 21.25, 25.75);
        this.load.atlasXML('ships', '/assets/spritesheet/ship.png', '/assets/atlas/ship.xml');
        this.load.tilemapTiledJSON('scene01', '/assets/tilemap/scene01.json');
        this.load.image('tileset', '/assets/tileset/scene01.png');
        this.load.audio('ship-soundtrack', '/assets/sound/ship-soundtrack.mp3');

        //  Load the Google WebFont Loader script
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    }

    create() {
        //Start physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //Create map
        this.map = this.add.tilemap('scene01');
        this.map.addTilesetImage('scene01', 'tileset');

        //Water
        this.layerWater = this.map.createLayer('Water');
        this.layerWater.resizeWorld();

        //Ground
        this.ground = this.map.createLayer('Ground');
        this.ground.resizeWorld();

        this.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.ground.body.enable = true;
        this.ground.body.immovable = true;

        //Ground
        this.objects = this.map.createLayer('Objects');
        this.objects.resizeWorld();

        this.physics.enable(this.objects, Phaser.Physics.ARCADE);
        this.objects.body.enable = true;
        this.objects.body.immovable = true;

        //Bridges
        this.bridges = this.map.createLayer('Bridges');
        this.bridges.resizeWorld();

        this.physics.enable(this.bridges, Phaser.Physics.ARCADE);
        this.bridges.body.enable = true;
        this.bridges.body.immovable = true;

        //Ship
        this.ship = this.add.sprite(this.world.width / 2, this.world.height - 80, 'ships', 'ship (1).png');
        this.ship.anchor.set(0.5, 0.5);
        this.ship.rotation = 1 * Math.PI;

        this.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.enable = true;
        this.ship.body.collideWorldBounds = true;

        this.shipSoundtrack = this.add.audio('ship-soundtrack', 1, true, true);
        this.shipSoundtrack.play();

        this.camera.follow(this.ship, Phaser.Camera.FOLLOW_TOPDOWN);

        //Map collisions
        this.map.setCollisionByExclusion([], true, this.objects);

        //Cursors
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.ship.body.y += -1.5;

        if (this.teseuLeftTheShip) {
            if (this.teseuIsVisible) {
                if (this.cursors.down.isDown)
                {
                    this.teseu.body.y += 1;
                    this.teseu.animations.play('walk-down');
                }
                else if (this.cursors.up.isDown)
                {
                    this.teseu.body.y += -1;
                    this.teseu.animations.play('walk-up');
                }
                else if (this.cursors.left.isDown)
                {
                    this.teseu.body.x += -1;
                    this.teseu.animations.play('walk-left');
                }
                else if (this.cursors.right.isDown)
                {
                    this.teseu.body.x += 1;
                    this.teseu.animations.play('walk-right');
                }
                else
                {
                    //teseu.animations.play('stand');
                    this.teseu.animations.stop();
                }
            }
        }

        this.shipHitsObject = this.physics.arcade.collide(this.ship, this.objects);
        
        if (this.teseuLeftTheShip && this.teseuIsVisible) {
            this.teseuHitsObject   = this.physics.arcade.collide(this.teseu, this.objects);
            this.teseuHitsShip     = this.physics.arcade.collide(this.teseu, this.ship);
        }

        if (this.shipHitsObject) {
            if (!this.teseuLeftTheShip) {
                this.time.events.add(Phaser.Timer.SECOND * 2, this.shipHitTheGround, this);

                this.teseuLeftTheShip = true;
            }
        }
        else {
            if(this.text) {
                this.text.x = this.ship.x;
                this.text.y = this.ship.y + 150;
            }
        }
    }

    createText() {
        //Text
        this.text = this.add.text(this.world.centerX, this.world.centerY, "- The puzzle of Minos -\nby\nFeralbyte Interactive");
        this.text.anchor.setTo(0.5);
        this.text.font = 'VT323';
        this.text.fontSize = 28;
    
        //  x0, y0 - x1, y1
        this.grd = this.text.context.createLinearGradient(0, 0, 0, this.text.canvas.height);
        this.grd.addColorStop(0, '#8ED6FF');   
        this.grd.addColorStop(1, '#004CB3');
        this.text.fill = this.grd;
    
        this.text.align = 'center';
        this.text.stroke = '#000000';
        this.text.strokeThickness = 2;
        this.text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    
        this.text.inputEnabled = true;
        this.text.input.enableDrag();
    
        this.text.events.onInputOver.add(this.over, this);
        this.text.events.onInputOut.add(this.out, this);
    }

    shipHitTheGround() {
        //Teseu
        this.teseu = this.add.sprite(this.ship.x, this.ship.y + -60, 'teseu', 4);
        this.teseu.anchor.set(0.5, 1);
        this.teseu.scale.setTo(2, 2);
    
        this.teseu.animations.add('stand', [4]);
        this.teseu.animations.add('walk-down', [0, 1, 2, 3], 8);
        this.teseu.animations.add('walk-up', [4, 5, 6, 7], 8);
        this.teseu.animations.add('walk-left', [8, 9, 10, 11], 8);
        this.teseu.animations.add('walk-right', [12, 13, 14, 15], 8);
    
        this.physics.enable(this.teseu, Phaser.Physics.ARCADE);
        this.teseu.body.enable = true;
        this.teseu.body.collideWorldBounds = true;
    
        this.teseuIsVisible = true;
    
        this.camera.follow(this.teseu, Phaser.Camera.FOLLOW_TOPDOWN);
    }

    out() {
        this.text.fill = this.grd;
    }

    over() {
        this.text.fill = '#ff00ff';
    }
}