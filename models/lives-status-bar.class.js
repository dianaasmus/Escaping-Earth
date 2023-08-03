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


    /**
     * Constructor of the LivesStatusBar class.
     * Loads the images for the lives display and adds the dimensions.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_LIVES);
        this.addDimensions();
        this.setPercentage(10);
    }


    /**
     * Adds the dimensions of the life display.
     * The position, width and height are set.
     */
    addDimensions() {
        this.x = 30;
        this.y = 30;
        this.width = 180;
        this.height = 35;
    }


    /**
     * Sets the percentage of the life indicator.
     * @param {number} percentage - The percentage of the life indicator.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIVES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}