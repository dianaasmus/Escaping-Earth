class Endboss extends MovableObject {
    height = 160;
    width = 120;
    y = 310;
    
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
        this.speed = 0.5 + Math.random() * 5; //unterschiedliche Geschw. Zahl zw. 0.15 und 0.65
        this.loadImages(this.IMAGES_WALKING);
    }

    animate() {
        this.moveLeft();
        setInterval(() => { //jedes bild wird 1 sekunde angezeigt, dann currentImage++
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000);
    }

    // removeEndboss(collidedObjectIndex) {
    //     // entfernt den laser anhand des angegebenen Indexes aus der Liste der shootingObjects
    //     if (collidedObjectIndex !== -1) {
    //         this.level.endboss.splice(collidedObjectIndex, 1);
    //     }
    // }
}