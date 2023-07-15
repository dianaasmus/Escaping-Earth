class Ammunition extends CollectableObject {
    width = 60;


    offset = {
        top : 15,
        right : 15,
        bottom: 15,
        left: 15,
        color: 'green' // Neue color-Eigenschaft hinzugefügt
    }


    constructor() {
        super().loadImage('img/ammunition/13.png');
        this.x = 200 + Math.random() * 2060;
        this.float();
    }
}