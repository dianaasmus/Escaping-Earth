class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;
    y = 0;


    /**
     * Constructor of the BackgroundObject class.
     * @param {string} imagePath - The file path of the image for the background object.
     * @param {number} x - The horizontal position of the background object on the X-axis.
    */
    constructor(imagePath, x) {
        super().loadImage(imagePath, x);
        this.x = x;
    }
}