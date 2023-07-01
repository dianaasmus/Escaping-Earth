class Endboss extends MovableObject {
    // world;
    height = 160;
    width = 120;
    y = 310;
    // level_end_x = this.world.level_end_x;
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
        // console.log(this.world);
        // console.log(this.world.level_end_x);
        // this.x = 2860 - 300; //level_end_x einsetzen
        this.x = 2860 - 300 * Math.random();
        this.speed = 0.5 + Math.random() * 5; //unterschiedliche Geschw. Zahl zw. 0.15 und 0.65
        this.loadImages(this.IMAGES_WALKING);
        // this.animate();
        // this.checkCharacter();
        // console.log(this.keyboard);
    }

    animate() {
        this.moveLeft();
        setInterval(() => { //jedes bild wird 1 sekunde angezeigt, dann currentImage++
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000);
    }

    // checkCharacter() {
    //     if ()
    // }
}