class BatteryStatusBar extends DrawableObject {
    percentage = 10;
    

    IMAGES_BATTERY = [
        'img/battery/battery-0.png',
        'img/battery/battery-20.png',
        'img/battery/battery-40.png',
        'img/battery/battery-60.png',
        'img/battery/battery-80.png',
        'img/battery/battery-100.png'
    ];


    /**
     * Constructor of the BatteryStatusBar class.
     * Initializes the battery status bar with default values.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BATTERY);
        this.x = 500;
        this.y = 30;
        this.width = 180;
        this.height = 30;
        this.setPercentage(10);
    }


    /**
     * Sets the percentage for the battery status bar.
     * Updates the displayed image based on the percentage.
     * @param {number} percentage - The new percentage for the battery.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BATTERY[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}