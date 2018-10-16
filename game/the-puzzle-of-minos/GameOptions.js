class GameOptions {
    constructor() {
        this.width  = 340;
        this.height = 480;
        this.type   = Phaser.AUTO;
        this.key    = 'ThePuzzleOfMinos';
        this.states = [ new GameStateInfo('TheseusShipArrives', TheseusShipArrives, false)];
    }
}