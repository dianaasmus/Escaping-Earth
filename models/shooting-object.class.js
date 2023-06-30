class ShootingObject extends MovableObject {
    // speedX = 0.5;

    constructor(x, y) {
        super().loadImage('img/ammunition/attack/ammunition-attack.png'); //Startbild
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.shoot();
    }

    shoot() {
        this.speedX = 50;
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
} 