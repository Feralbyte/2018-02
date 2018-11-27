let screen = new Screen();

/**
 * Global game configurations
 */
let gameConfigurations = {
    /**
     * Nf#01: Canvas proportions
     * The latest iPhone screen proportions
     * must be the current default resolution of this game.
     * iPhone X (15/11/2018)
     */
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        BootScene,
        SplashScene,
        MenuScene,
        OptionsScene,
        GameOverScene,
        CreditsScene,
        PauseScene,
        BoatScene,
        HarbourScene,
        TownScene, 
        PalaceScene,
        ForestScene,
        MazeScene,
        LastRoomScene
    ]
};

/**
 * Check if the game is being loaded in a mobile device mode
 */
if (navigator.userAgent.indexOf("Mobile") != -1 || navigator.userAgent.indexOf("Tablet") != -1) {
    gameConfigurations.width = screen.width;
    gameConfigurations.height = screen.height;
}

/**
 * Global Phaser game assignment
 */
const game = new Phaser.Game(gameConfigurations);

/**
 * Adjust aspect ration acording to the proportions defined in the configuration object
 * whenever the window is loaded.
 */
window.onload = function(){
    window.focus();

    /**
     * Resize event
     */
    window.addEventListener('resize', function(){
        let canvas = document.querySelector('canvas');

        if (canvas != null) {
            let windowWidth     = window.innerWidth;
            let windowHeight    = window.innerHeight;

            let windowRatio     = windowWidth / windowHeight;
            let gameRatio       = gameConfigurations.width / gameConfigurations.height;

            if (windowRatio < gameRatio) {
                console.log(`Window ratio is smaller than game ratio (wR: ${windowRatio}, gR: ${gameRatio}).`);

                canvas.style.width  = windowWidth + 'px';
                canvas.style.height = windowWidth / gameRatio + 'px';
            }
            else {
                canvas.style.width  = windowHeight * gameRatio + 'px';
                canvas.style.height = windowHeight + 'px';
            }

            console.log(`Canvas width and height updated according to the right aspect ratio (w: ${canvas.style.width}, h: ${canvas.style.height}).`);
        }

        screen.calcDimensions();
    }, false);

    
};