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


    /**
     * Checks if the game is paused and the game-over window is not displayed.
     * @returns {boolean} True if the game is not paused and the game-over window is not displayed, otherwise False.
     */
    noPauseNoGameOver() {
        return !document.getElementById('innerInfoContainer') && !document.getElementById('gameOver');
    }


    /**
     * Moves the object to the right if the game is not paused and the game-over window is not displayed.
     */
    moveRight() {
        if (this.noPauseNoGameOver()) {
            this.x += this.speed;
        }
    }


    /**
     * Moves the object to the left if the game is not paused and the game-over window is not displayed.
     */
    moveLeft() {
        if (!document.getElementById('innerInfoContainer') && !document.getElementById('gameOver')) {
            this.x -= this.speed;
        }
    }


    /**
     * Checks if this movable object is colliding with another movable object.
     * @param {MovableObject} movableObject - The other movable object to check for collision with.
     * @returns {boolean} True if a collision is happening, otherwise False.
     */
    isColliding(movableObject) {
        return (
            this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom
        );
    }


    /**
     * Plays the animation of the movable object based on the given images.
     * @param {string[]} images - An array of image paths to be used for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Applies gravity to the movable object, causing it to fall.
     */
    applyGravity() {
        this.y = 220;
        this.setStoppableInterval(this.gravity, 1000 / 25);
    }


    /**
     * Calculates the gravity of the movable object and updates its vertical position.
     */
    gravity() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }


    /**
     * Checks if the movable object is above the ground.
     * @returns {boolean} True if the movable object is above the ground, otherwise False.
     */
    isAboveGround() {
        return this.y < 320;
    }


    /**
     * Reduces the lives of the movable object after being hit.
     */
    hit() {
        this.lives -= 1;
        if (this.lives < 0) {
            this.lives = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Performs an action when the movable object is hit by another object.
     * @param {string} action - The action to be performed (e.g., 'collectAmmunition', 'hitEndboss', 'collectLives', 'hitEnemy').
     */
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


    /**
     * Increments a specific property of the movable object and limits the value between a minimum and a maximum.
     * @param {string} property - The name of the property to be incremented.
     * @param {number} increment - The increment value.
     * @param {number} min - The minimum value the property can have.
     * @param {number} max - The maximum value the property can have.
     */
    incrementProperty(property, increment, min, max) {
        this[property] += increment;
        this[property] = Math.min(Math.max(this[property], min), max);
    }


    /**
     * Decrements a specific property of the movable object and limits the value to a minimum.
     * @param {string} property - The name of the property to be decremented.
     * @param {number} decrement - The decrement value.
     * @param {number} min - The minimum value the property can have.
     */
    decrementProperty(property, decrement, min) {
        this[property] -= decrement;
        this[property] = Math.max(this[property], min);
    }


    /**
     * Checks if the movable object is dead (has no lives left).
     * @returns {boolean} True if the movable object is dead, otherwise False.
     */
    isDead() {
        return this.lives == 0;
    }


    /**
     * Checks if the movable object is hurt (if it was hit in the last 1 second).
     * @returns {boolean} True if the movable object is hurt, otherwise False.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
}
