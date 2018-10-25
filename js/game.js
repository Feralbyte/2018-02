var game = new Phaser.Game(411, 823, Phaser.AUTO);

game.state.add('boot', stateBoot);
game.state.add('load', stateLoad);
game.state.add('menu', stateMenu);
game.state.add('play', statePlay);
game.state.add('win', stateWin);

game.state.start('boot');