class Endboss extends MovableObject {
    height = 160;
    width = 120;
    y = 310;
    // hasPassed2000 = false;

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
        this.speed = 8 + Math.random() * 15; //unterschiedliche Geschw. Zahl zw. 0.15 und 0.65
        this.loadImages(this.IMAGES_WALKING);
    }

    animate() {
        setInterval(() => { //jedes bild wird 1 sekunde angezeigt, dann currentImage++
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}