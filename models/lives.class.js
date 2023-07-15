class Lives extends CollectableObject {

    offset = {
        top : 15,
        right : 10,
        bottom: 15,
        left: 10,
        color: 'green' // Neue color-Eigenschaft hinzugefügt
    }

    
    constructor() {
        super().loadImage('img/lives/14.png');
        this.x = 200 + Math.random() * 2060;
        this.float();
    }
}