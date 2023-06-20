class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;
    y = 0;
    x = 0;

    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}