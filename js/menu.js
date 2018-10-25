var stateMenu = {
    create: function() {
        var labelName = game.add.text(80, 80, 'The puzzle of minos', { font: '50px Arial', fill: '#ffffff' });
        var labelStart = game.add.text(80, game.world.height - 80, 'press W key to start', { font: '25px Arial', fill: '#ffffff' });

        var keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
        keyW.onDown.addOnce(this.start, this);
    },

    start: function() {
        game.state.start('play');
    }
}