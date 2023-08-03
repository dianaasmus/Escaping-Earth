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


    /**
     * Checks for collisions between the character and enemies, handles the collisions accordingly, and updates the lives status bar.
     */
    isCollidingEnemies() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.isColliding(enemy)) {
                if (this.isAboveGround() && this.y == 250) {
                    this.crushing_zombie_sound.play();
                    this.killZombie(enemy);
                } else if (!enemy.isDead) {
                    this.hit();
                }
                this.world.livesStatusBar.setPercentage(this.lives);
            }
        });
    }


    /**
     * Handles killing an enemy, updating its state to "dead" and removing it after a delay.
     */
    killZombie() {
        const collidedObjectIndex = this.world.level.enemies.findIndex((enemy) => {
            return this.isColliding(enemy);
        });
        this.world.level.enemies[collidedObjectIndex].showDeadEnemy();
        this.spliceEnemy(collidedObjectIndex);
    }


    /**
     * Splices the dead enemy from the enemies array and removes it from the world after a delay.
     * @param {number} collidedObjectIndex - The index of the collided enemy.
     */
    spliceEnemy(collidedObjectIndex) {
        const deadEnemies = [this.world.level.enemies[collidedObjectIndex]];

        setTimeout(() => {
            this.removeDeadEnemies(deadEnemies);
        }, 1000);
    }


    /**
     * Removes dead enemies from the world's enemies array.
     * @param {Array} deadEnemies - An array of dead enemies to be removed.
     */
    removeDeadEnemies(deadEnemies) {
        this.world.level.enemies = this.world.level.enemies.filter(enemy => !deadEnemies.includes(enemy));
    }


    /**
     * Checks for collisions between lasers (shooting objects) and enemies, and handles the collisions by removing the enemy and the laser.
     */
    isCollidingLaser() {
        this.world.shootingObject.forEach((shot) => {
            this.world.level.enemies.forEach((enemy) => {
                if (shot.isColliding(enemy)) {
                    this.handleCollision(shot, enemy);
                }
            });
        });
    }


    /**
     * Handles the collision between a laser and an enemy by removing both the enemy and the laser.
     * @param {ShootingObject} shot - The laser (shooting object) colliding with the enemy.
     * @param {Enemy} enemy - The enemy being hit by the laser.
     */
    handleCollision(shot, enemy) {
        const enemyIndex = this.world.level.enemies.findIndex((e) => e === enemy);
        const shotIndex = this.world.shootingObject.findIndex((s) => s === shot);
        this.removeEnemy(enemyIndex);
        this.removeLaser(shotIndex);
    }


    /**
     * Removes the enemy at the given index from the world's enemies array.
     * @param {number} collidedObjectIndex - The index of the collided enemy.
     */
    removeEnemy(collidedObjectIndex) {
        if (collidedObjectIndex !== -1) {
            this.world.level.enemies.splice(collidedObjectIndex, 1);
        }
    }


    /**
     * Removes the laser at the given index from the world's shootingObject array.
     * @param {number} collidedObjectIndex - The index of the collided laser.
     */
    removeLaser(collidedObjectIndex) {
        if (collidedObjectIndex !== -1) {
            this.world.shootingObject.splice(collidedObjectIndex, 1);
        }
    }


    /**
     * Checks for collisions with endboss objects in the world and performs actions accordingly.
     */
    isCollidingEndboss() {
        this.world.level.endboss.forEach((endboss) => {
            this.handleCharacterEndbossCollision(endboss);
            this.handleLaserEndbossCollision(endboss);
        });
    }


    /**
     * Handles character-endboss collision.
     * @param {Endboss} endboss - The endboss object to check collision with.
     */
    handleCharacterEndbossCollision(endboss) {
        if (this.isColliding(endboss)) {
            this.lives = 0;
            this.world.livesStatusBar.setPercentage(this.lives);
            this.isDyingSettings();
        }
    }


    /**
     * Handles laser-endboss collision.
     * @param {Endboss} endboss - The endboss object to check collision with.
     */
    handleLaserEndbossCollision(endboss) {
        this.world.shootingObject.forEach((shot) => {
            if (shot.isColliding(endboss)) {
                this.handleCollisionEndboss(shot, endboss);
            }
        });
    }


    /**
     * Handles collision between a shot and an endboss. Updates the game state accordingly.
     * @param {ShootingObject} shot - The shot object that collided with the endboss.
     * @param {Endboss} endboss - The endboss object that was hit by the shot.
     */
    handleCollisionEndboss(shot, endboss) {
        const endbossIndex = this.world.level.endboss.findIndex((e) => e === endboss);
        const shotIndex = this.world.shootingObject.findIndex((s) => s === shot);
        this.hitEndboss(endbossIndex);
        this.removeLaser(shotIndex);
    }


    /**
     * Handles the hit on an endboss, reducing its health and removing it from the world if its health reaches zero.
     * @param {number} endbossIndex - The index of the endboss that was hit.
     */
    hitEndboss(endbossIndex) {
        const endboss = this.world.level.endboss[endbossIndex];
        const battery = this.getBatteryForEndboss(endboss.id);

        this.checkbattery(battery, endbossIndex);
        this.batteryAll -= 1;
        this.world.batteryStatusBar.setPercentage(this.batteryAll);
    }


    /**
     * Checks the battery for an endboss and reduces its health. If the endboss health reaches zero, removes the endboss from the world.
     * @param {string} battery - The name of the battery property associated with the endboss.
     * @param {number} endbossIndex - The index of the endboss that was hit.
     */
    checkbattery(battery, endbossIndex) {
        if (!battery) {
            return;
        }

        this[battery] -= 1;
        if (this[battery] === 0) {
            this.removeEndboss(endbossIndex);
        }
    }


    /**
     * Gets the battery property corresponding to the endboss ID.
     * @param {number} endbossId - The ID of the endboss.
     * @returns {string|null} The name of the battery property or null if no corresponding battery property exists.
     */
    getBatteryForEndboss(endbossId) {
        switch (endbossId) {
            case 1:
                return 'batteryOne';
            case 2:
                return 'batteryTwo';
            case 3:
                return 'batteryThree';
            default:
                return null;
        }
    }


    /**
     * Removes the endboss from the world's endboss array.
     * @param {number} endbossIndex - The index of the endboss to remove.
     */
    removeEndboss(endbossIndex) {
        if (endbossIndex !== -1) {
            this.world.level.endboss.splice(endbossIndex, 1);
        }
    }


    /**
     * Sets the shot if certain conditions are met.
     */
    setShot() {
        if (this.noPauseNoGameOver() && !this.world.gameIsOver) {
            if (this.otherDirection) {
                let shootStart = this.x - 50;
                this.world.createShot(shootStart);
            } else {
                let shootStart = this.x + 50;
                this.world.createShot(shootStart);
            }
        }
    }
}