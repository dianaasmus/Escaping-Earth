class LivesStatusBar extends DrawableObject {
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
        this.height = 35;
        this.setPercentage(10);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIVES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}