class AmmunitionStatusBar extends DrawableObject {
    percentage = 10;

    
    IMAGES_AMMUNITION = [
        'img/ammunition/progress-bar/ammunition-0.png',
        'img/ammunition/progress-bar/ammunition-20.png',
        'img/ammunition/progress-bar/ammunition-40.png',
        'img/ammunition/progress-bar/ammunition-60.png',
        'img/ammunition/progress-bar/ammunition-80.png',
        'img/ammunition/progress-bar/ammunition-100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_AMMUNITION);
        this.x = 35;
        this.y = 90;
        this.width = 180;
        this.height = 35;
        this.setPercentage(10);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_AMMUNITION[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}