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
    background_music = new Audio('assets/audio/music.mp3');
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
        this.setStoppableInterval(this.run, 100);
        this.setStoppableInterval(this.checkShootObjects, 100);
        this.setStoppableInterval(this.checkLaserEnemyCollision, 50);
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
        if (this.noAmmunitionButEndboss() && !this.gameIsOver) {
            this.character.pauseAudios();
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
        this.checkCollisions();
        this.checkCharacter();
            this.checkGameOver();

    }


    /**
     * Check all character-object-collision.
     */
    checkCollisions() {
        this.character.isCollidingEnemies();
        this.character.isCollidingEndboss();
        this.character.isCollidingLives();
        this.character.isCollidingAmmunition();
    }

    /**
     * Check shot and laser collision.
     */
    checkLaserEnemyCollision() {
        this.character.isCollidingLaser();
    }


    /**
     * Checks if there is available ammunition and shoots when the "TAB" key is pressed.
     * Otherwise, checks for game-winning conditions and triggers the victory condition if met.
     */
    checkShootObjects() {
        if (this.availableAmmunition()) {
            if (this.keyboard.KEY_TAB) {
                this.character.setShot();
            }
        } else if (this.noBatteryNoEndboss()) {
            this.youWonTimeout();
            this.character.batteryAll = 10;
        }
    }


    /**
     * Checks if there is available ammunition for the character.
     * @returns {boolean} True if there is available ammunition; otherwise, false.
     */
    availableAmmunition() {
        return this.character.ammunition > 0;
    }


    /**
     * Checks if there is no battery remaining and no endbosses remaining in the level, and the game over element is not present.
     * @returns {boolean} True if there is no battery and no endbosses remaining and the game over element is not present; otherwise, false.
     */
    noBatteryNoEndboss() {
        const batteryIsDepleted = this.character.batteryAll === 0;
        const noEndBossRemaining = this.level.endboss.length === 0;
        const gameOverElementNotPresent = !document.getElementById('gameOver');

        return batteryIsDepleted && noEndBossRemaining && gameOverElementNotPresent;
    }


    /**
     * Sets a timeout that triggers a game victory.
     */
    youWonTimeout() {
        setTimeout(() => {
            this.character.pauseAudios();
            gameOver('youWon');
        }, 500);
    }


    /**
     * Checks the character's position and triggers animations for endbosses when the character has passed a certain position.
     */
    checkCharacter() {
        if (this.character.x >= 2900 && !this.hasPassed2900) {
            this.hasPassed2900 = true;
            this.level.endboss.forEach((endboss) => {
                endboss.animate();
            });
        }
    }


    /**
     * Creates a shooting object (laser) and adds it to the world's shootingObject array.
     * @param {number} shootStart - The starting x-coordinate for the shooting object (laser).
     */
    createShot(shootStart) {
        let shootingWidth = 60;
        let laser = new ShootingObject(shootStart, this.character.y, this.character.otherDirection);

        this.character.width = shootingWidth;
        this.character.playAnimation(this.character.IMAGES_SHOOTING);
        this.shootingObject.push(laser);
        this.character.hittedObject('hitEnemy');
        this.ammunitionStatusBar.setPercentage(this.character.ammunition);
    }
}