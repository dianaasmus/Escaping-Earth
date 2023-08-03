class World {
    character = new Character();
    level = level1;
    backgroundObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    livesStatusBar = new LivesStatusBar();
    batteryStatusBar = new BatteryStatusBar();
    ammunitionStatusBar = new AmmunitionStatusBar();
    shootingObject = [];
    background_music = new Audio('audio/music.mp3');
    hasPassed2900 = false;
    intervalIDs = [];
    gameIsOver = false;
    deadEnemies = [];


    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element used for drawing.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.setCanvas(canvas);
        this.createBackgroundObjects();
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.setStoppableInterval(this.run, 50);
    }


    /**
     * Sets up the canvas context and dimensions.
     * @param {HTMLCanvasElement} canvas - The canvas element to set up.
     */
    setCanvas(canvas) {
        canvas.width = 720;
        canvas.height = 480;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
    }


    /**
     * Checks if the game is over and triggers the game over state if necessary.
     */
    checkGameOver() {
        if (this.noAmmunitionButEndboss()) {
            this.gameIsOver = true;
            gameOver('youLost');
        }
    }


    /**
     * Checks if there is no ammunition left but an end boss is present, and the player has at least one battery.
     * @returns {boolean} True if there is no ammunition left but an end boss is present, and the player has at least one battery, otherwise False.
     */
    noAmmunitionButEndboss() {
        return this.shootingObject.length === 0 && this.character.ammunition === 0 && this.level.endboss.length >= 1 && this.character.batteryAll >= 1;
    }


    /**
     * Sets a stoppable interval for the given function with the specified time.
     * @param {Function} fn - The function to be executed periodically.
     * @param {number} time - The time interval for the function execution.
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
    }


    /**
     * Creates background objects based on the level's positions and backgrounds.
     */
    createBackgroundObjects() {
        let innerArrayCounter = 0;

        for (let j = 0; j < this.level.positions.length; j++) {
            const position = this.level.positions[j];
            for (let i = 0; i < this.level.backgrounds.length; i++) {
                const background = this.level.backgrounds[i];
                if (Array.isArray(background)) {
                    innerArrayCounter = this.addNewBuildings(innerArrayCounter, background, position);
                } else {
                    this.backgroundObjects.push(new BackgroundObject(background, position));
                }
            }
        }
    }


    /**
     * Adds new buildings to the background objects based on the current inner array counter, background array, and position.
     * @param {number} innerArrayCounter - The current inner array counter for the background array.
     * @param {Array} background - The background array containing buildings.
     * @param {number} position - The position for the background objects.
     * @returns {number} The updated inner array counter.
     */
    addNewBuildings(innerArrayCounter, background, position) {
        const building = background[innerArrayCounter];
        innerArrayCounter++;

        if (innerArrayCounter >= background.length) {
            innerArrayCounter = 0;
        }

        this.backgroundObjects.push(new BackgroundObject(building, position));
        return innerArrayCounter;
    }


    /**
     * Links the character and keyboard instances to this world instance.
     */
    setWorld() {
        this.character.world = this;
        this.keyboard.world = this;
    }


    /**
     * Clears the canvas, adds the foundation, and creates a frame loop for drawing.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addFoundation();
        this.createFrameLoop();
    }


    /**
     * Adds the foundation elements to the canvas (background objects, status bars, movable objects).
     */
    addFoundation() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBars(this.livesStatusBar, this.batteryStatusBar, this.ammunitionStatusBar);
        this.ctx.translate(this.camera_x, 0);
        this.addMovableObjects();
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Adds the status bars (lives, battery, and ammunition) to the canvas.
     * @param {LivesStatusBar} livesStatusBar - The lives status bar.
     * @param {BatteryStatusBar} batteryStatusBar - The battery status bar.
     * @param {AmmunitionStatusBar} ammunitionStatusBar - The ammunition status bar.
     */
    addStatusBars(livesStatusBar, batteryStatusBar, ammunitionStatusBar) {
        this.addToMap(livesStatusBar);
        this.addToMap(batteryStatusBar);
        this.addToMap(ammunitionStatusBar);
    }


    /**
     * Creates the frame loop for drawing the canvas content.
     */
    createFrameLoop() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Adds all movable objects to the canvas (shooting objects, enemies, end bosses, lives, and ammunition).
     */
    addMovableObjects() {
        this.addObjectsToMap(this.shootingObject);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.lives);
        this.addObjectsToMap(this.level.ammunition);
    }


    /**
     * Adds an array of movable objects to the canvas.
     * @param {MovableObject[]} objects - The array of movable objects to be added to the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * Adds a movable object to the canvas.
     * @param {MovableObject} movableObject - The movable object to be added to the canvas.
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        movableObject.drawFrame(this.ctx);
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }


    /**
     * Flips the image of a movable object horizontally for the other direction.
     * @param {MovableObject} movableObject - The movable object whose image needs to be flipped.
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }


    /**
     * Flips the image of a movable object back to its original orientation.
     * @param {MovableObject} movableObject - The movable object whose image needs to be flipped back.
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }


    /**
     * The main game loop that runs various collision checks and game states.
     */
    run() {
        this.isCollidingEnemies();
        this.isCollidingEndboss();
        this.isCollidingLives();
        this.isCollidingAmmunition();
        this.isCollidingLaser();
        this.checkShootObjects();
        this.checkCharacter();
        if (this.gameIsOver == false) {
            this.checkGameOver();
        }
    }


    /**
     * Checks for collisions between the character and enemies, handles the collisions accordingly, and updates the lives status bar.
     */
    isCollidingEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.y == 250) {
                    this.character.crushing_zombie_sound.play();
                    this.killZombie(enemy);
                } else if (!enemy.isDead) {
                    this.character.hit();
                }
                this.livesStatusBar.setPercentage(this.character.lives);
            }
        });
    }


    /**
     * Checks for collisions between lasers (shooting objects) and enemies, and handles the collisions by removing the enemy and the laser.
     */
    isCollidingLaser() {
        this.shootingObject.forEach((shot) => {
            this.level.enemies.forEach((enemy) => {
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
        const enemyIndex = this.level.enemies.findIndex((e) => e === enemy);
        const shotIndex = this.shootingObject.findIndex((s) => s === shot);
        this.removeObject(this.level.enemies, enemyIndex);
        this.removeObject(this.shootingObject, shotIndex);
    }

    // removeObject(object, enemy, objectId) {
    //     if (objectId) {
    //         // object.splice(objectId, 1);
    //         enemyId = enemy.id === objectId;
    //         object.splice(enemyId, 1);
    //     }
    // }

    removeEnemyById(indexToRemove) {
        // Suche den Index des Elements mit der 'idToRemove'

        // Wenn das Element mit der 'idToRemove' gefunden wurde (Index ist nicht -1), entferne es mit splice
        if (indexToRemove !== -1) {
            this.level.enemies.splice(indexToRemove, 1);
        }

        return this.level.enemies;
    }

    isCollidingEndboss() {
        this.level.endboss.forEach((endboss) => {
            this.handleCharacterEndbossCollision(endboss);
            this.isCollidingWithLaser(endboss);
        });
    }


    handleCharacterEndbossCollision(endboss) {
        if (this.character.isColliding(endboss)) {
            this.character.lives = 0;
            this.livesStatusBar.setPercentage(this.character.lives);
            this.character.isDyingSettings();
        }
    }


    isCollidingWithLaser(endboss) {
        this.shootingObject.forEach((shot) => {
            if (shot.isColliding(endboss)) {
                this.handleCollisionEndboss(shot, endboss);
            }
        });
    }


    handleCollisionEndboss(shot, endboss) {
        const endbossIndex = this.level.endboss.findIndex((e) => e === endboss);
        const shotIndex = this.shootingObject.findIndex((s) => s === shot);
        this.hitEndboss(endbossIndex);
        this.removeObject(this.shootingObject, shotIndex);
    }


    hitEndboss(endbossIndex) {
        const endboss = this.level.endboss[endbossIndex];
        const battery = this.getBatteryForEndboss(endboss.id);

        if (!battery) {
            return;
        }
        this.character[battery] -= 1;
        if (this.character[battery] === 0) {
            this.removeEndboss(endbossIndex, endboss.id);
        }

        this.character.batteryAll -= 1;
        this.batteryStatusBar.setPercentage(this.character.batteryAll);
    }


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


    removeEndboss(endbossIndex) {
        if (endbossIndex !== -1) {
            this.level.endboss.splice(endbossIndex, 1);
        }
    }


    killZombie() {
        const collidedObjectIndex = this.level.enemies.findIndex((enemy) => {
            return this.character.isColliding(enemy);
        });
        this.showDeadEnemy(collidedObjectIndex);
        this.removeEnemyById(collidedObjectIndex);
    }

    
    removeEnemyById(collidedObjectIndex) {
        const deadEnemies = [this.level.enemies[collidedObjectIndex]];

        setTimeout(() => {
            this.removeDeadEnemies(deadEnemies);
        }, 1000);
    }


    removeDeadEnemies(deadEnemies) {
        this.level.enemies = this.level.enemies.filter(enemy => !deadEnemies.includes(enemy));
    
    }


    showDeadEnemy(collidedObjectIndex) {
        this.level.enemies[collidedObjectIndex].isDead = true;
        this.level.enemies[collidedObjectIndex].height = 40;
        this.level.enemies[collidedObjectIndex].width = 70;
        this.level.enemies[collidedObjectIndex].y = 360;
        this.level.enemies[collidedObjectIndex].loadImage('img/enemies/dead.png');
    }


    isCollidingAmmunition() {
        this.level.ammunition.forEach((ammunition) => {
            if (this.character.isColliding(ammunition)) {
                this.character.collecting_ammunition_sound.play();
                this.character.hittedObject('collectAmmunition');
                this.ammunitionStatusBar.setPercentage(this.character.ammunition);
                this.getAmmunitionIndex(ammunition);
            }
        });
    }


    getAmmunitionIndex() {
        const collidedObjectIndex = this.level.ammunition.findIndex((ammunition) => {
            return this.character.isColliding(ammunition);
        });
        this.removeAmmunition(collidedObjectIndex);
    }


    removeAmmunition(collidedObjectIndex) {
        if (collidedObjectIndex !== -1) {
            this.level.ammunition.splice(collidedObjectIndex, 1);
        }
    }


    isCollidingLives() {
        this.level.lives.forEach((lives) => {
            if (this.character.isColliding(lives)) {
                this.character.collecting_lives_sound.play();
                this.character.hittedObject('collectLives');
                this.livesStatusBar.setPercentage(this.character.lives);
                this.getLivesIndex(lives);
            }
        });
    }


    getLivesIndex() {
        const collidedObjectIndex = this.level.lives.findIndex((lives) => {
            return this.character.isColliding(lives);
        });
        this.removeLives(collidedObjectIndex);
    }


    removeLives(collidedObjectIndex) {
        if (collidedObjectIndex !== -1) {
            this.level.lives.splice(collidedObjectIndex, 1);
        }
    }


    checkShootObjects() {
        if (this.availableAmmunition()) {
            if (this.keyboard.KEY_TAB) {
                this.setShot();
            }
        } else if (this.noBatteryNoEndboss()) {
            this.youWonTimeout();
            this.character.batteryAll = 10;
        }
    }


    youWonTimeout() {
        setTimeout(() => {
            this.gameIsOver = true;
            if (this.character.running_sound) {
                this.character.pauseAudios();
            }
            gameOver('youWon');
        }, 500);
    }


    noBatteryNoEndboss() {
        const batteryIsDepleted = this.character.batteryAll === 0;
        const noEndBossRemaining = this.level.endboss.length === 0;
        const gameOverElementNotPresent = !document.getElementById('gameOver');

        return batteryIsDepleted && noEndBossRemaining && gameOverElementNotPresent;
    }


    setShot() {
        if (this.character.noPauseNoGameOver() && !this.gameIsOver) {
            if (this.character.otherDirection) {
                let shootStart = this.character.x - 50;
                this.createShot(shootStart);
            } else {
                let shootStart = this.character.x + 50;
                this.createShot(shootStart);
            }
        }
    }


    createShot(shootStart) {
        let shootingWidth = 60;
        let laser = new ShootingObject(shootStart, this.character.y, this.character.otherDirection);

        this.character.width = shootingWidth;
        this.character.playAnimation(this.character.IMAGES_SHOOTING);
        this.shootingObject.push(laser);
        this.character.hittedObject('hitEnemy');
        this.ammunitionStatusBar.setPercentage(this.character.ammunition);
    }


    availableAmmunition() {
        return this.character.ammunition > 0
    }


    checkCharacter() {
        if (this.character.x >= 2900 && !this.hasPassed2900) {
            this.hasPassed2900 = true;
            this.level.endboss.forEach((endboss) => {
                endboss.animate();
            });
        }
    }
}