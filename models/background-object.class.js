class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;
    y = 0;
    // x = 0;

    constructor(imagePath, x) {
        super().loadImage(imagePath, x);
        this.x = x;
        // this.createBackgroundObjects(); //Hintergrund erstelllen -> Fkt
        // this.setWorld();

    }

    // createBackgroundObjects() {
    //     for (let i = 0; i < this.backgrounds.length; i++) {
    //         for (let j = 0; j < this.positions.length; j++) {
    //             const background = this.backgrounds[i];
    //             const position = this.positions[j];
    //             this.backgroundObjects.push(new BackgroundObject(background, position));
    //         }
    //     }
    // }
}