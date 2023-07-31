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
    collectableObject = new CollectableObject();
    movableObject = new MovableObject();
    background_music = new Audio('audio/music.mp3');
    hasPassed1500 = false;
    intervalIDs = [];
    gameIsOver = false;


    constructor(canvas, keyboard) {
        this.setCanvas(canvas);
        this.createBackgroundObjects();
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.setStoppableInterval(this.run, 50);
    }


    setCanvas(canvas) {
        canvas.width = 720;
        canvas.height = 480;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
    }


    checkGameOver() {
        if (this.noAmmunitionButEndboss()) {
            gameOver('youLost');
            this.gameIsOver = true;
        }
    }


    noAmmunitionButEndboss() {
        return this.shootingObject.length === 0 && this.character.ammunition === 0 && this.level.endboss.length >= 1 && this.character.batteryAll >= 1;
    }


    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
    }


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


    addNewBuildings(innerArrayCounter, background, position) {
        const building = background[innerArrayCounter];
        innerArrayCounter++;

        if (innerArrayCounter >= background.length) {
            innerArrayCounter = 0;
        }

        this.backgroundObjects.push(new BackgroundObject(building, position));
        return innerArrayCounter;
    }


    setWorld() {
        this.character.world = this;
        this.keyboard.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addFoundation();
        this.createFrameLoop();
    }


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


    addStatusBars(livesStatusBar, batteryStatusBar, ammunitionStatusBar) {
        this.addToMap(livesStatusBar);
        this.addToMap(batteryStatusBar);
        this.addToMap(ammunitionStatusBar);
    }


    createFrameLoop() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addMovableObjects() {
        this.addObjectsToMap(this.shootingObject);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.lives);
        this.addObjectsToMap(this.level.ammunition);
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


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


    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }


    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }


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


    isCollidingEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.y == 320) {
                    this.character.crushing_zombie_sound.play();
                    this.killZombie(enemy);
                } else if (!enemy.isDead) {
                    this.character.hit();
                }
                this.livesStatusBar.setPercentage(this.character.lives);
            }
        });
    }


    isCollidingLaser() {
        this.shootingObject.forEach((shot) => {
            this.level.enemies.forEach((enemy) => {
                if (shot.isColliding(enemy)) {
                    this.handleCollision(shot, enemy);
                }
            });
        });
    }


    handleCollision(shot, enemy) {
        const enemyIndex = this.level.enemies.findIndex((e) => e === enemy);
        const shotIndex = this.shootingObject.findIndex((s) => s === shot);
        this.removeEnemy(enemyIndex);
        this.removeLaser(shotIndex);
    }


    removeEnemy(collidedObjectIndex) {
        if (collidedObjectIndex !== -1) {
            this.level.enemies.splice(collidedObjectIndex, 1);
        }
    }

    removeLaser(collidedObjectIndex) {
        if (collidedObjectIndex !== -1) {
            this.shootingObject.splice(collidedObjectIndex, 1);
        }
    }


    isCollidingEndboss() {
        this.level.endboss.forEach((endboss) => {
            this.handleCharacterEndbossCollision(endboss);
            this.isCollidingWithLaser(endboss);
        });
    }


    handleCharacterEndbossCollision(endboss) {
        if (this.character.isColliding(endboss)) {
            this.character.hit();
            this.livesStatusBar.setPercentage(this.character.lives);
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
        this.removeLaser(shotIndex);
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
        setTimeout(() => {
            this.removeEnemy(collidedObjectIndex);
        }, 1000);
    }


    showDeadEnemy(collidedObjectIndex) {
        this.level.enemies[collidedObjectIndex].isDead = true;
        this.level.enemies[collidedObjectIndex].height = 40;
        this.level.enemies[collidedObjectIndex].width = 70;
        this.level.enemies[collidedObjectIndex].y = 430;
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
            setTimeout(() => {
                gameOver('youWon');
                this.gameIsOver = true;
            }, 1000);
            this.character.batteryAll = 10;
        }
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
        if (this.character.x >= 1500 && !this.hasPassed1500) {
            this.hasPassed1500 = true;
            this.level.endboss.forEach((endboss) => {
                endboss.animate();
            });
        }
    }
}