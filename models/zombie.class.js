class Zombie extends MovableObject {
    height = 100;
    width = 70;
    y = 370;


    offset = {
        top : 10,
        right : 15,
        bottom: 10,
        left: 25,
        color: 'red' // Neue color-Eigenschaft hinzugefügt
    }


    IMAGES_WALKING = [
        'img/enemies/zombie-walk.png',
        'img/enemies/zombie-walk2.png',
        'img/enemies/zombie-walk3.png',
        'img/enemies/zombie-walk4.png',
        'img/enemies/zombie-walk5.png',
        // 'img/enemies/zombie-walk6.png',
        'img/enemies/zombie-walk7.png'
    ];

    // IMAGE_DEAD = 'img/enemies/dead.png';

    constructor() {
        super().loadImage('img/enemies/zombie-walk.png');
        this.x = 200 + Math.random() * 2060;
        this.speed = 0.15 + Math.random() * 0.5; //unterschiedliche Geschw. Zahl zw. 0.15 und 0.65
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        this.setStoppableInterval(this.moveZombies, 1000 / 60);
        this.setStoppableInterval(this.playAnimationZombies, 200);
    }


    moveZombies() {
        this.moveLeft();
    }


    playAnimationZombies() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    // showDeadEnemy() {
    //     loadImage(this.IMAGE_DEAD);
    // }
}