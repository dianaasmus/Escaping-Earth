class Lives extends CollectableObject {
    
    constructor() {
        super().loadImage('img/lives/14.png');
        this.x = 200 + Math.random() * 2060;
        this.float();
    }
}