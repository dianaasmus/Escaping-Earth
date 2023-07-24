class Lives extends CollectableObject {
    y = 380;
    shift = -1;
    minY = this.y - 10; 
    maxY = this.y + 10; 


    offset = {
        top : 15,
        right : 10,
        bottom: 15,
        left: 10,
        color: 'green' 
    }

    
    constructor() {
        super().loadImage('img/lives/14.png');
        this.x = 200 + Math.random() * 2060;
        this.setStoppableInterval(this.floatingObject, 1000 / 15);
    }


    floatingObject() {  
        this.y += this.shift;
        if (this.y <= this.minY || this.y >= this.maxY) {
            this.shift *= -1; 
        }
    }
}