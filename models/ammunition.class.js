class Ammunition extends CollectableObject {
    width = 60;

    constructor() {
        super().loadImage('img/ammunition/13.png');
        this.x = 200 + Math.random() * 2060;
        this.float();
    }
}