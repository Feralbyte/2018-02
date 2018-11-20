class SplashScene extends Phaser.Scene {
    constructor() {
        super('SplashScene');
    }

    preload() {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(window.innerWidth / 2 - 160, window.innerHeight - 72, 320, 20);

        let loadingText = this.make.text({ x: window.innerWidth / 2, y: window.innerHeight - 85, text: 'Loading...', style: { font: '14px monospace', fill: '#ffffff' } });
        loadingText.setOrigin(0.5, 0.5);
        
        let percentText = this.make.text({ x: loadingText.x, y: window.innerHeight - 62, text: '0%', style: { font: '12px monospace', fill: '#f2f2f2' } });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({ x: loadingText.x, y: window.innerHeight - 46, text: '', style: { font: '12px monospace', fill: '#aaaaaa' } });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value) {
            percentText.setText(parseInt(value * 100) + '%');

            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(window.innerWidth / 2 - 158, window.innerHeight - 70, 316 * value, 16);
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

        // </all game assets>
    }

    create() {
        this.scene.start('MenuScene');
    }

    update() {
        
    }
}