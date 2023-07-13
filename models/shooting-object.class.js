class ShootingObject extends MovableObject {


    constructor(x, y) {
        super().loadImage('img/ammunition/attack/ammunition-attack.png'); //Startbild
        this.x = x;
        this.y = y + 30;
        this.width = 30;
        this.height = 30;
        this.shoot();
    }


    shoot() {
        this.speedX = 50;
        this.setStoppableInterval(this.moveShot, 50);
    }

    
    moveShot() {
        this.x += 20;
    }   
} 