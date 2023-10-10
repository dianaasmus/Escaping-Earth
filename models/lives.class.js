class Lives extends CollectableObject {
    y = 310;
    shift = -1;
    minY = this.y - 10; 
    maxY = this.y + 10;


    offset = {
        top : 15,
        right : 10,
        bottom: 15,
        left: 10,
        color: 'transparent' 
    }

  
    /**
     * Lives class constructor.
     * Loads the image for the lives object, sets the random X position and starts the animation.
     */
    constructor() {
        super().loadImage('assets/img/lives/14.png');
        this.x = 200 + Math.random() * 2060;
        this.setStoppableInterval(this.floatingObject, 1000 / 15);
    }


    /**
     * Animates the vertical movement of the life object.
     */
    floatingObject() {  
        this.y += this.shift;
        if (this.y <= this.minY || this.y >= this.maxY) {
            this.shift *= -1; 
        }
    }
}