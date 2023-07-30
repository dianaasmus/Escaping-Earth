class Ammunition extends CollectableObject {
    width = 60;
    y = 280;

    shift = -1;
    minY = this.y - 10;
    maxY = this.y + 10;


    offset = {
        top : 15,
        right : 15,
        bottom: 15,
        left: 15,
        color: 'transparent'
    }


    constructor() {
        super().loadImage('img/ammunition/13.png');
        this.x = 200 + Math.random() * 2060;
        this.setStoppableInterval(this.floatingObject, 1000 / 15);
    }


    floatingObject() {
        this.y += this.shift;
        if (this.objectIsInRange()) {
            this.shift *= -1;
        }
    }

    
    objectIsInRange() {
        return this.y <= this.minY || this.y >= this.maxY;
    }
}