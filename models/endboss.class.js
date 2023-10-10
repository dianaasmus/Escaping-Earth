class Endboss extends MovableObject {
    height = 200;
    width = 120;
    y = 200;

    offset = {
        top: 10,
        right: 40,
        bottom: 10,
        left: 40,
        color: 'transparent'
    }

    IMAGES_WALKING = [
        'assets/img/endboss/walk/walk-1.png',
        'assets/img/endboss/walk/walk-2.png',
        'assets/img/endboss/walk/walk-3.png',
        'assets/img/endboss/walk/walk-4.png',
        'assets/img/endboss/walk/walk-5.png',
        'assets/img/endboss/walk/walk-6.png'
    ];

    /**
     * Constructor of the Endboss class.
     * Initializes the end boss with the specified ID, position, speed, and images.
     * @param {number} id - The ID of the end boss.
     */
    constructor(id) {
        super();
        this.id = id;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.x = 3760 - 300 * Math.random();
        this.speed = 8 + Math.random() * 15;
        this.loadImages(this.IMAGES_WALKING);
    }

    /**
     * Starts the animation of the end boss.
     */
    animate() {
        this.setStoppableInterval(this.moveEndboss, 200);
    }

    /**
     * Moves the end boss to the left and plays the walking animation.
     */
    moveEndboss() {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
    }
}
