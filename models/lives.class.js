class Lives extends MovableObject {
    height = 60;
    width = 50;


    constructor() {
        super().loadImage('img/lives/14.png');
        this.x = 200 + Math.random() * 2060;
        this.float();
    }
}