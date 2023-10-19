class BatteryStatusBar extends DrawableObject {
    percentage = 6;


    IMAGES_BATTERY = [
        'assets/img/battery/battery-0.png',
        'assets/img/battery/battery-20.png',
        'assets/img/battery/battery-40.png',
        'assets/img/battery/battery-60.png',
        'assets/img/battery/battery-80.png',
        'assets/img/battery/battery-100.png'
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
        this.setPercentage(6);
    }


    /**
     * Calculates the image index based on the percentage and the array of images.
     * @returns {number} - The index of the image in the image array.
     */
    resolveImageIndexEndboss() {
        if (this.percentage == 5) {
            return 5;
        } else if (this.percentage == 4) {
            return 4;
        } else if (this.percentage == 3) {
            return 3;
        } else if (this.percentage == 2) {
            return 2;
        } else if (this.percentage == 1) {
            return 1;
        } else {
            return 0;
        }
    }


    /**
     * Sets the percentage for the battery status bar.
     * Updates the displayed image based on the percentage.
     * @param {number} percentage - The new percentage for the battery.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BATTERY[this.resolveImageIndexEndboss()];
        this.img = this.imageCache[path];
    }
}