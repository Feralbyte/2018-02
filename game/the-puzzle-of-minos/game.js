var game; 

window.onload = function() {
    game = new Phaser.Game(options.width, options.height, options.type, options.key, { init: init, preload: preload, create: create, update: update });
    
    window.focus();
    //resize();

    window.addEventListener("resize", resize, false);
}

function resize() {
    let canvas = document.querySelector("canvas");

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;

    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        //canvas.style.width = windowWidth + "px";
        canvas.style.height = windowHeight + "px";
    }
}