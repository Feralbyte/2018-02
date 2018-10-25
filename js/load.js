var stateLoad = {
    preload: function() {
        var labelLoading = game.add.text(80, 150, 'loading...', { font: '30px Courier', fill: '#ffffff' });

        game.load.spritesheet('teseu', '/assets/spritesheet/teseu.png', 21.25, 25.75);
        game.load.spritesheet('procusto', '/assets/spritesheet/procusto.png', 21.25, 25.75);

        game.load.atlasXML('ships', '/assets/spritesheet/ships.png', '/assets/spritesheet/ships.xml');
        game.load.tilemap('scene01', '/assets/tilemap/scene01.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', '/assets/tilesheet/tileset.png');

        game.load.audio('ship-soundtrack', '/assets/sound/ship-soundtrack.mp3');

        //  Load the Google WebFont Loader script
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },

    create: function() {
        game.state.start('menu');
    }
};