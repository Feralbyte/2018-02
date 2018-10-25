var directions = {
    none: 0,
    up: 1,
    right: 2,
    down: 3,
    left: 4,    
}

var teseu;
var teseuLeftTheShip    = false;
var teseuIsVisible      = false;

var procusto;
var procustoIsVisible   = false;
var procustoDirection   = directions.none;

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

var statePlay = {
    create: function() {        
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        //Create map
        map = game.add.tilemap('scene01');
        map.addTilesetImage('tileset', 'tileset');

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

        //resize();
    },

    update: function() {
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

                if(teseu.body.y == 0) {
                    game.state.start('win');
                }
            }
        }

        if(procustoIsVisible) {
            if (procustoDirection == directions.right) {
                if (procusto.body.x < 270) {
                    procusto.body.x += 0.8;
                    procusto.animations.play('walk-right');
                }
                else {
                    procustoDirection = directions.left;
                }
            }
            else if (procustoDirection == directions.left) {
                if (procusto.body.x > 10) {
                    procusto.body.x += -0.8;
                    procusto.animations.play('walk-left');
                }
                else {
                    procustoDirection = directions.right;
                }
            }
        }

        var shipHitsObject = game.physics.arcade.collide(ship, objects);
        
        if (teseuLeftTheShip && teseuIsVisible) {
            var teseuHitsObject   = game.physics.arcade.collide(teseu, objects);
            var teseuHitsShip  = game.physics.arcade.collide(teseu, ship);
            var teseuHitsProcusto = game.physics.arcade.collide(teseu, procusto);
            var procustoHitsObject = game.physics.arcade.collide(procusto, objects);


            if (procustoHitsObject) {
                if (procustoDirection == directions.right) {
                    procustoDirection = directions.left;
                }
                else if (procustoDirection == directions.left) {
                    procustoDirection = directions.right;
                }
            }
        }

        if (shipHitsObject) {
            if (!teseuLeftTheShip) {
                game.time.events.add(Phaser.Timer.SECOND * 2, this.shipHitTheGround, this);

                teseuLeftTheShip = true;
            }
        }
        else {
            if(text) {
                text.x = ship.x;
                text.y = ship.y + 150;
            }
            else {
                this.createText();
            }
        }
    },

    createText: function() {
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

        text.events.onInputOver.add(this.over, this);
        text.events.onInputOut.add(this.out, this);
    },

    shipHitTheGround: function() {
        //Teseu
        teseu = game.add.sprite(ship.x, ship.y + -60, 'teseu', 4);
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

        //Procusto
        procusto = game.add.sprite(teseu.x, teseu.y + -480, 'procusto', 0);
        procusto.anchor.set(0.5, 1);
        procusto.scale.setTo(2, 2);  

        procusto.animations.add('stand', [0]);
        procusto.animations.add('walk-down', [0, 1, 2, 3], 8);
        procusto.animations.add('walk-up', [4, 5, 6, 7], 8);
        procusto.animations.add('walk-left', [8, 9, 10, 11], 8);
        procusto.animations.add('walk-right', [12, 13, 14, 15], 8);

        game.physics.enable(procusto, Phaser.Physics.ARCADE);
        procusto.body.enable = true;
        procusto.body.collideWorldBounds = true;

        procustoIsVisible = true;
        procustoDirection = directions.right;
    },

    out: function() {
        text.fill = grd;
    },

    over: function() {
        text.fill = '#ff00ff';
    }
}

