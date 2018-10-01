var options = {
    type: Phaser.AUTO,
    width: 320,
    height: 480,
    key: 'the-puzzle-of-minos',
    //width: window.innerWidth * window.devicePixelRatio,
    //height: window.innerHeight * window.devicePixelRatio
}

var game = new Phaser.Game(options.width, options.height, options.type, options.key, { init: init, preload: preload, create: create, update: update });

var teseu;
var teseuLeftTheShip    = false;
var teseuIsVisible      = false;
var ship;
var cursors;

var map;

var water;
var ground;
var objects;
var bridges;

var speed = 100;

var shipSoundtrack;

var text = null;
var gradient;

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND * 3, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['VT323']
    }

};

function init() {

}

function preload() {
    game.load.spritesheet('teseu', 'lib/assets/images/teseu.png', 21.25, 25.75);
    game.load.atlasXML('ships', 'lib/assets/kenney_piratepack/Spritesheet/shipsMiscellaneous_sheet.png', 'lib/assets/kenney_piratepack/Spritesheet/shipsMiscellaneous_sheet.xml');

    game.load.tilemap('scene-01', 'lib/assets/tilemaps/the-puzzle-of-minos-scene-01.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('scene-02', 'lib/assets/tilemaps/the-puzzle-of-minos-scene-02.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('scenes-01-02', 'lib/assets/tilemaps/the-puzzle-of-minos-scenes-01-02.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('tileset', 'lib/assets/kenney_piratepack/Tilesheet/tiles_sheet.png');

    game.load.audio('ship-soundtrack', 'lib/assets/sound/ship-soundtrack.mp3');

    //  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}

function create() {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    //Start physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Create map
    map = game.add.tilemap('scenes-01-02');
    map.addTilesetImage('tiles_sheet', 'tileset');

    //Water
    layerWater = map.createLayer('Water');
    layerWater.resizeWorld();

    //Ground
    ground = map.createLayer('Ground');
    ground.resizeWorld();

    game.physics.enable(ground, Phaser.Physics.ARCADE);
    ground.body.enable = true;
    ground.body.immovable = true;

    //Ground
    objects = map.createLayer('Objects');
    objects.resizeWorld();

    game.physics.enable(objects, Phaser.Physics.ARCADE);
    objects.body.enable = true;
    objects.body.immovable = true;

    //Bridges
    bridges = map.createLayer('Bridges');
    bridges.resizeWorld();

    game.physics.enable(bridges, Phaser.Physics.ARCADE);
    bridges.body.enable = true;
    bridges.body.immovable = true;

    //Ship
    ship = game.add.sprite(game.world.width / 2, game.world.height - 80, 'ships', 'ship (1).png');
    ship.anchor.set(0.5, 0.5);
    ship.rotation = 1 * Math.PI;
    
    game.physics.enable(ship, Phaser.Physics.ARCADE);
    ship.body.enable = true;
    ship.body.collideWorldBounds = true;

    shipSoundtrack = game.add.audio('ship-soundtrack', 1, true, true);
    shipSoundtrack.play();

    game.camera.follow(ship, Phaser.Camera.FOLLOW_TOPDOWN);

    //Map collisions
    map.setCollisionByExclusion([], true, objects);

    //Cursors
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    ship.body.y += -1.5;

    if (teseuLeftTheShip) {
        if (teseuIsVisible) {
            if (cursors.down.isDown)
            {
                teseu.body.y += 1;
                teseu.animations.play('walk-down');
            }
            else if (cursors.up.isDown)
            {
                teseu.body.y += -1;
                teseu.animations.play('walk-up');
            }
            else if (cursors.left.isDown)
            {
                teseu.body.x += -1;
                teseu.animations.play('walk-left');
            }
            else if (cursors.right.isDown)
            {
                teseu.body.x += 1;
                teseu.animations.play('walk-right');
            }
            else
            {
                //teseu.animations.play('stand');
                teseu.animations.stop();
            }
        }
    }

    var shipHitsObject = game.physics.arcade.collide(ship, objects);
    
    if (teseuLeftTheShip && teseuIsVisible) {
        var teseuHitsObject   = game.physics.arcade.collide(teseu, objects);
        var teseuHitsShip  = game.physics.arcade.collide(teseu, ship);


    }

    if (shipHitsObject) {
        if (!teseuLeftTheShip) {
            game.time.events.add(Phaser.Timer.SECOND * 2, shipHitTheGround, this);

            teseuLeftTheShip = true;
        }
    }
    else {
        if(text) {
            text.x = ship.x;
            text.y = ship.y + 150;
        }
    }
}

function createText() {
    //Text
    text = game.add.text(game.world.centerX, game.world.centerY, "- The puzzle of Minos -\nby\nFeralbyte Interactive");
    text.anchor.setTo(0.5);
    text.font = 'VT323';
    text.fontSize = 28;

    //  x0, y0 - x1, y1
    grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');
    text.fill = grd;

    text.align = 'center';
    text.stroke = '#000000';
    text.strokeThickness = 2;
    text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    text.inputEnabled = true;
    text.input.enableDrag();

    text.events.onInputOver.add(over, this);
    text.events.onInputOut.add(out, this);
}

function shipHitTheGround() {
    //Teseu
    teseu      = game.add.sprite(ship.x, ship.y + -60, 'teseu', 4);
    teseu.anchor.set(0.5, 1);
    teseu.scale.setTo(2, 2);

    teseu.animations.add('stand', [4]);
    teseu.animations.add('walk-down', [0, 1, 2, 3], 8);
    teseu.animations.add('walk-up', [4, 5, 6, 7], 8);
    teseu.animations.add('walk-left', [8, 9, 10, 11], 8);
    teseu.animations.add('walk-right', [12, 13, 14, 15], 8);

    game.physics.enable(teseu, Phaser.Physics.ARCADE);
    teseu.body.enable = true;
    teseu.body.collideWorldBounds = true;

    teseuIsVisible = true;

    game.camera.follow(teseu, Phaser.Camera.FOLLOW_TOPDOWN);
}

function out() {
    text.fill = grd;
}

function over() {
    text.fill = '#ff00ff';
}




