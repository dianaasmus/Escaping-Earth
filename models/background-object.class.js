class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;
    y = 0;

    
    constructor(imagePath, x) {
        super().loadImage(imagePath, x);
        this.x = x;
    }
}