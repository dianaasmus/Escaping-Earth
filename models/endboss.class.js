class Endboss extends MovableObject {
    height = 160;
    width = 120;
    y = 310;
    
    IMAGES_WALKING = [
        'img/endboss/walk-1.png',
        'img/endboss/walk-2.png',
        'img/endboss/walk-3.png',
        'img/endboss/walk-4.png',
        'img/endboss/walk-5.png',
        'img/endboss/walk-6.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.x = 2860 - 300 * Math.random();
        this.speed = 0.5 + Math.random() * 5; //unterschiedliche Geschw. Zahl zw. 0.15 und 0.65
        this.loadImages(this.IMAGES_WALKING);
    }

    animate() {
        this.moveLeft();
        setInterval(() => { //jedes bild wird 1 sekunde angezeigt, dann currentImage++
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000);
    }
}