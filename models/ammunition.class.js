class Ammunition extends CollectableObject {
    width = 60;
    y = 210;

    shift = -1;
    minY = this.y - 10;
    maxY = this.y + 10;


    /**
     * The offset values for collision detection of the ammunition object.
     * @type {{top: number, right: number, bottom: number, left: number, color: string}}
     */
    offset = {
        top: 15,
        right: 15,
        bottom: 15,
        left: 15,
        color: 'transparent'
    }


    /**
     * Constructs an instance of Ammunition.
     * Initializes the ammunition object with default values and behavior.
     */
    constructor() {
        super().loadImage('assets/img/ammunition/13.png');
        this.x = 300 + Math.random() * 2060;
        this.setStoppableInterval(this.floatingObject, 1000 / 15);
    }


    /**
     * Floats the ammunition object up and down by updating its y-coordinate.
     * Changes the floating direction when the object reaches the minY or maxY values.
     */
    floatingObject() {
        this.y += this.shift;
        if (this.objectIsInRange()) {
            this.shift *= -1;
        }
    }


    /**
     * Checks if the ammunition object's y-coordinate is within the minY and maxY range.
     * @returns {boolean} - True if the object is within the range, otherwise false.
     */
    objectIsInRange() {
        return this.y <= this.minY || this.y >= this.maxY;
    }
}