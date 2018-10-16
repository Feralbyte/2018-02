class ThePuzzleOfMinos extends Phaser.Game {
    constructor(options) {
        super(options.width, options.height, options.type, options.key);

        options.states.foreach(function(gameStateInfo) {
            this.state.add(gameStateInfo.key, gameStateInfo.state, gameStateInfo.autoStart);
        });
    }
}