class Endboss extends MovableObject {
    height = 200;
    width = 120;
    y = 270;


    offset = {
        top : 10,
        right : 40,
        bottom: 10,
        left: 40,
        color: 'green'
    }


    IMAGES_WALKING = [
        'img/endboss/walk/walk-1.png',
        'img/endboss/walk/walk-2.png',
        'img/endboss/walk/walk-3.png',
        'img/endboss/walk/walk-4.png',
        'img/endboss/walk/walk-5.png',
        'img/endboss/walk/walk-6.png'
    ];


    constructor(id) {
        super();
        this.id = id;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.x = 2860 - 300 * Math.random();
        this.speed = 8 + Math.random() * 15;
        this.loadImages(this.IMAGES_WALKING);
    }


    animate() {
        this.setStoppableInterval(this.moveEndboss, 200);
    }

    
    moveEndboss() {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
    }
}