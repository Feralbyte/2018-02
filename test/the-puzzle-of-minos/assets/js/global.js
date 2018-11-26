class Screen {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.center =  {
            x: 0,
            y: 0
        };
        this.top = 30;
    }

    calcDimensions() {
        let canvas = document.querySelector('canvas');

        if (canvas != null) {
            this.width = canvas.style.width.toString().replace('px', '');
            this.height = canvas.style.height.toString().replace('px', '');
            
            this.center.x = this.width / 2;
            this.center.y = this.height / 2;
        }
    }
}

const textStyle = {
    gameTitle: {
        font: '44pt Concert One',
        fill: '#ffeaa7',
        align: 'center'
    },
    menuOption: {
        fontSize: '44px',
        fontFamily: 'Concert One',
        fill: '#ffeaa7',
        hover: {
            fill: '#ffffff'
        }
    },
    loadingTitle: {
        font: '14px monospace', 
        fill: '#ffffff' 
    },
    loadingText: {
        font: '12px monospace',
        fill: '#f2f2f2'
    },
    loadingAsset: {
        font: '12px monospace',
        fill: '#aaaaaa'
    },
    optionsText: {
        font: 'bold 60pt Concert One',
        fill: '#FDFFB5',
        align: 'center'
    }
};