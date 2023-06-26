class Zombie extends MovableObject {
    height = 100;
    width = 70;
    y = 370;
    IMAGES_WALKING = [
        'img/enemies/zombie-walk.png',
        'img/enemies/zombie-walk2.png',
        'img/enemies/zombie-walk3.png',
        'img/enemies/zombie-walk4.png',
        'img/enemies/zombie-walk5.png',
        // 'img/enemies/zombie-walk6.png'
        'img/enemies/zombie-walk7.png'
    ];

    constructor() {
        super().loadImage('img/enemies/zombie-walk.png');
        this.x = 200 + Math.random() * 2060;
        this.speed = 0.15 + Math.random() * 0.5; //unterschiedliche Geschw. Zahl zw. 0.15 und 0.65
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
    
    animate() {
        this.otherDirection = false; //bilder nicht spiegeln
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => { //jedes bild wird 1 sekunde angezeigt, dann currentImage++
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}