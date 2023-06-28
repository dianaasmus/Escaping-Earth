class StatusBar extends DrawableObject {
    percentage = 10;

    IMAGES_LIVES = [
        'img/lives/progress-bar/lives-0.png',
        'img/lives/progress-bar/lives-20.png',
        'img/lives/progress-bar/lives-40.png',
        'img/lives/progress-bar/lives-60.png',
        'img/lives/progress-bar/lives-80.png',
        'img/lives/progress-bar/lives-100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_LIVES);
        this.x = 30;
        this.y = 30;
        this.width = 180;
        this.height = 55;
        this.setPercentage(10);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIVES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 10) {
            return 5;
        } else if (this.percentage > 8) {
            return 4;
        } else if (this.percentage > 6) {
            return 3;
        } else if (this.percentage > 4) {
            return 2;
        } else if (this.percentage > 2) {
            return 1;
        } else {
            return 0;
        } 
    }
}