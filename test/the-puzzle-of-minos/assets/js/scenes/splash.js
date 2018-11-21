class SplashScene extends Phaser.Scene {
    constructor() {
        super('SplashScene');
    }

    preload() {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(window.innerWidth / 2 - 160, window.innerHeight - 104, 320, 20);

        let loadingText = this.make.text({ x: window.innerWidth / 2 - 10, y: window.innerHeight - 112, text: 'Loading...', style: { font: '14px monospace', fill: '#ffffff' } });
        loadingText.setOrigin(0.5, 0.5);
        
        let percentText = this.make.text({ x: loadingText.x, y: window.innerHeight - 94, text: '0%', style: { font: '12px monospace', fill: '#f2f2f2' } });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({ x: loadingText.x, y: window.innerHeight - 72, text: '', style: { font: '12px monospace', fill: '#aaaaaa' } });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value) {
            percentText.setText(parseInt(value * 100) + '%');

            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(window.innerWidth / 2 - 158, window.innerHeight - 102, 316 * value, 16);
        });
        this.load.on('fileprogress', function(file) {
            assetText.setText('asset: ' + file.key);
        });
        this.load.on('complete', function() {
            loadingText.setText('Ready!');
            
            percentText.destroy();
            progressBar.destroy();
            progressBox.destroy();
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

        /**
         * Tilemaps
         */
        // this.load.tilemapTiledJSON('tilemap-boat', 'assets/sprites/tilemaps/boat.json');
        // this.load.tilemapTiledJSON('tilemap-harbor', 'assets/sprites/tilemaps/harbor.json');
        // this.load.tilemapTiledJSON('tilemap-town', 'assets/sprites/tilemaps/town.json');
        // this.load.tilemapTiledJSON('tilemap-palace', 'assets/sprites/tilemaps/palace.json');
        // this.load.tilemapTiledJSON('tilemap-forest', 'assets/sprites/tilemaps/forest.json');
        // this.load.tilemapTiledJSON('tilemap-maze', 'assets/sprites/tilemaps/maze.json');
        // this.load.tilemapTiledJSON('tilemap-lastroom', 'assets/sprites/tilemaps/lastroom.json');

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
        // </all game assets>
    }

    create() {
        this.scene.start('MenuScene');
    }

    update() {
        
    }
}