class StatusBar extends DrawableObject {
    percentage = 100;
    // camera_x = this.world.camera_x;
    // x = 100;
    // y = 100;

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
        // console.log(this.IMAGES_LIVES[5]);
        this.x = 30;
        this.y = 30;
        this.width = 180;
        this.height = 55;
        console.log(this.IMAGES_LIVES[5], this.x, this.y);
        // this.loadImage(this.IMAGES_LIVES[this.resolveImageIndex()]);
        this.setPercentage(100);
        // this.camera_x = -this.x + 30;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIVES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        } 
    }
}