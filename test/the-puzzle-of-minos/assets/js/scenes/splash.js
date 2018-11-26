class SplashScene extends Phaser.Scene {
    constructor() {
        super('SplashScene');
    }

    preload() {
        // Add Feralbyte's logo to the screen
        this.logo = this.add.image(screen.center.x, screen.center.y, 'logo');
        // Scalling Feralbyte's logo to half of its size.
        this.logo.setScale(0.4);

        let progressBar = this.add.graphics();

        let loadingText = this.make.text({ x: screen.center.x, y: screen.height - 112, text: 'Loading...', style: textStyle.loadingTitle});
        loadingText.setOrigin(0.5, 0.5);
        
        let percentText = this.make.text({ x: screen.center.x, y: screen.height - 94, text: '0%', style: textStyle.loadingText });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({ x: screen.center.x, y: screen.height - 72, text: '', style: textStyle.loadingAsset });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value) {
            percentText.setText(parseInt(value * 100) + '%');

            progressBar.clear();
            progressBar.fillStyle(0x999999, 0.5);
            progressBar.fillRect(screen.center.x - 158, screen.height - 102, 316 * value, 16);
        });
        this.load.on('fileprogress', function(file) {
            assetText.setText('asset: ' + file.key);
        });
        this.load.on('complete', function() {
            loadingText.setText('Ready!');
            
            percentText.destroy();
            progressBar.destroy();
            //progressBox.destroy();
            assetText.destroy();
        });

        // <all game assets>
        /**
         * Soundtrack
         */
        this.load.audio('soundtrack-intro', 'assets/audio/soundtrack/intro.mp3');
        this.load.audio('soundtrack-menu', 'assets/audio/soundtrack/menu.mp3');
        this.load.audio('soundtrack-boat', 'assets/audio/soundtrack/boat.mp3');
        this.load.audio('soundtrack-harbour', 'assets/audio/soundtrack/harbour.mp3');
        this.load.audio('soundtrack-town', 'assets/audio/soundtrack/town.mp3');
        this.load.audio('soundtrack-palace', 'assets/audio/soundtrack/palace.mp3');
        this.load.audio('soundtrack-forest', 'assets/audio/soundtrack/forest.mp3');
        this.load.audio('soundtrack-maze', 'assets/audio/soundtrack/maze.mp3');
        this.load.audio('soundtrack-lastroom', 'assets/audio/soundtrack/lastroom.mp3');

        /**
         * Audio effects
         */
        this.load.audio('run', 'assets/audio/effects/run.mp3');
        this.load.audio('coin', 'assets/audio/effects/coin.mp3');
        this.load.audio('gameover', 'assets/audio/effects/gameover.mp3');
        this.load.audio('sword', 'assets/audio/effects/sword.mp3');
        this.load.audio('boss', 'assets/audio/effects/boss.mp3');

        /**
         * Tilesets
         */
        // this.load.image('tileset-boat', 'assets/sprites/tilesets/boat.png');
        // this.load.image('tileset-harbour', 'assets/sprites/tilesets/harbour.png');
        // this.load.image('tileset-town', 'assets/sprites/tilesets/town.png');
        // this.load.image('tileset-palace', 'assets/sprites/tilesets/palace.png');
        // this.load.image('tileset-forest', 'assets/sprites/tilesets/forest.png');
        // this.load.image('tileset-maze', 'assets/sprites/tilesets/maze.png');
        // this.load.image('tileset-lastroom', 'assets/sprites/tilesets/lastroom.png');
        this.load.image('tileset-harbour-water', 'assets/sprites/scenes/harbour/agua.png');
        this.load.image('tileset-harbour-bridge', 'assets/sprites/scenes/harbour/Ponte.png');
        this.load.image('tileset-harbour-house', 'assets/sprites/scenes/harbour/Casa 1.png');

        /**
         * Tilemaps
         */
        // this.load.tilemapTiledJSON('tilemap-boat', 'assets/sprites/tilemaps/boat.json');
        this.load.tilemapTiledJSON('tilemap-harbour', 'assets/sprites/tilemaps/harbour.json');
        // this.load.tilemapTiledJSON('tilemap-town', 'assets/sprites/tilemaps/town.json');
        // this.load.tilemapTiledJSON('tilemap-palace', 'assets/sprites/tilemaps/palace.json');
        // this.load.tilemapTiledJSON('tilemap-forest', 'assets/sprites/tilemaps/forest.json');
        // this.load.tilemapTiledJSON('tilemap-maze', 'assets/sprites/tilemaps/maze.json');
        // this.load.tilemapTiledJSON('tilemap-lastroom', 'assets/sprites/tilemaps/lastroom.json');

        /**
         * Sprites
         */
        this.load.image('water', 'assets/sprites/scenes/boat/agua.png');
        this.load.image('boat', 'assets/sprites/scenes/boat/Barco.png');

        /**
         * Characters
         */
        this.load.spritesheet('spritesheet-ariadne', 'assets/sprites/spritesheets/characters/ariadne.png', { frameWidth: 21.25, frameHeight: 25.75 });
        this.load.spritesheet('spritesheet-dionisio', 'assets/sprites/spritesheets/characters/dionisio.png', { frameWidth: 21.25, frameHeight: 25.75 });
        this.load.spritesheet('spritesheet-minos', 'assets/sprites/spritesheets/characters/minos.png', { frameWidth: 21.25, frameHeight: 25.75 });
        this.load.spritesheet('spritesheet-minotauro', 'assets/sprites/spritesheets/characters/minotauro.png', { frameWidth: 21.25, frameHeight: 25.75 });
        this.load.spritesheet('spritesheet-procusto', 'assets/sprites/spritesheets/characters/procusto.png', { frameWidth: 21.25, frameHeight: 25.75 });
        this.load.spritesheet('spritesheet-satiro', 'assets/sprites/spritesheets/characters/satiro.png', { frameWidth: 21.25, frameHeight: 25.75 });
        this.load.spritesheet('spritesheet-teseu', 'assets/sprites/spritesheets/characters/teseu.png', { frameWidth: 21.25, frameHeight: 25.75 });
        this.load.spritesheet('spritesheet-thief', 'assets/sprites/spritesheets/characters/thief.png', { frameWidth: 21.25, frameHeight: 25.75 });

        /**
         * Miscellaneous sprites
         */
        this.load.image('background-menu', 'assets/sprites/menu.png');
        this.load.image('background-credits', 'assets/sprites/credits.png');
        // </all game assets>
    }

    create() {
        this.scene.start('MenuScene');
    }

    update() {
        
    }
}