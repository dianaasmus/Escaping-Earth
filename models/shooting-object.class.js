class ShootingObject extends MovableObject {


    constructor(x, y, otherdirection) {
        super().loadImage('img/ammunition/attack/ammunition-attack.png'); //Startbild
        this.x = x;
        this.y = y + 30;
        this.width = 30;
        this.height = 30;
        this.shoot(otherdirection);
        // console.log(otherdirection);
    }


    shoot(otherdirection) {
        this.speedX = 50;
        if (otherdirection) {
            this.otherDirection = true

            this.setStoppableInterval(this.moveShotLeft, 50);
        } else {
            this.setStoppableInterval(this.moveShotRight, 50);
        }
    }


    moveShotRight() {
        this.x += 20;
    }

    moveShotLeft() {
        this.x -= 20;
    }
} 