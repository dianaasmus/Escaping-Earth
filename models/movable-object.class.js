class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 5;

    onCollisionCourse = true;
    lives = 10;
    ammunition = 10;
    lastHit = 0;
    speedX = 1;

    batteryOne = 3;
    batteryTwo = 4;
    batteryThree = 3;
    batteryAll = 10;


    noPauseNoGameOver() {
        return !document.getElementById('innerInfoContainer') && !document.getElementById('gameOver');
    }


    moveRight() {
        if (this.noPauseNoGameOver()) {
            this.x += this.speed;
        }
    }


    moveLeft() {
        if (!document.getElementById('innerInfoContainer') && !document.getElementById('gameOver')) {
            this.x -= this.speed;
        }
    }


    isColliding(movableObject) {
        return (
            this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom
        );
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    applyGravity() {
        this.y = 290;
        this.setStoppableInterval(this.gravity, 1000 / 25);
    }


    gravity() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }


    isAboveGround() {
        return this.y < 390;
    }


    hit() {
        this.lives -= 1;
        if (this.lives < 0) {
            this.lives = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    hittedObject(action) {
        switch (action) {
            case 'collectAmmunition':
                this.incrementProperty('ammunition', 1, 0, 10);
                break;
            case 'hitEndboss':
                this.decrementProperty('energy', 1, 0);
                break;
            case 'collectLives':
                this.incrementProperty('lives', 1, 0, 10);
                break;
            case 'hitEnemy':
                this.decrementProperty('ammunition', 1, 0);
                break;
        }
    }


    incrementProperty(property, increment, min, max) {
        this[property] += increment;
        this[property] = Math.min(Math.max(this[property], min), max);
    }


    decrementProperty(property, decrement, min) {
        this[property] -= decrement;
        this[property] = Math.max(this[property], min);
    }


    isDead() {
        return this.lives == 0;
    }


    isHurt() { 
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
}