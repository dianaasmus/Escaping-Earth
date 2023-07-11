class World {
    character = new Character();
    level = level1; //auf alle variablen in level1 zugreifen + Z. 
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
    background_music = new Audio('audio/music.mp3');
    hasPassed2000 = false;
    gameLost = false;
    gameWin = false;

    constructor(canvas, keyboard) { //von game.js aufnehmen
        canvas.width = 720;
        canvas.height = 480;
        this.ctx = canvas.getContext('2d');
        // this.background_music.play(); //geht nur nach einer User-Aktion z. B. Button onclick
        this.createBackgroundObjects(); //Hintergrund erstelllen -> Fkt
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    createBackgroundObjects() {
        for (let i = 0; i < this.level.backgrounds.length; i++) {
            for (let j = 0; j < this.level.positions.length; j++) {
                const background = this.level.backgrounds[i];
                const position = this.level.positions[j];
                this.backgroundObjects.push(new BackgroundObject(background, position));
            }
        }
    }

    setWorld() { // character hat eine Variable namens 'world', womit wir auf die variablen aus der world zugreifen können => keyboard
        this.character.world = this; //this.character.world = neue Variable. die auf das aktuelle Objekt (world) verweist.
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.addBackground();
        this.addFoundation();
        this.createFrameLoop();
    }

    addFoundation() {
        this.ctx.translate(this.camera_x, 0); //verschiebt die Kameraansicht 
        this.addObjectsToMap(this.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0); // Back //Elemente werden bei -100 gezeichnet, dann wird camera wieder zurückgesetzt
        // ...space for fixed objects...
        this.addToMap(this.livesStatusBar);
        this.addToMap(this.batteryStatusBar);
        this.addToMap(this.ammunitionStatusBar);
        this.ctx.translate(this.camera_x, 0); //forward //verschiebt die Kameraansicht 
        this.addMovableObjects();
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0); //Elemente werden bei -100 gezeichnet, dann wird camera wieder zurückgesetzt
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
        if (movableObject.otherDirection) { //character.otherDirection exists -> true/false
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        movableObject.drawFrame(this.ctx);
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    flipImage(movableObject) {
        this.ctx.save(); // aktuellen Zusatnd speichern, um Änderungen am Kontext vornehmen z. B. Translate
        this.ctx.translate(movableObject.width, 0); // Verschieben der aktuellen Zeichenposition um den Wert con movableObject.width
        this.ctx.scale(-1, 1); //-1 = horizontaler Skalierungsfaktor (spiegeln), 1 = vertikaler Skalierungsfaktor bleibt gleich (keine Spiegelung)
        movableObject.x = movableObject.x * -1; // X Koordinate spiegeln (ingesamt 2 mal spiegeln, zum Urgsprungswert)
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1; // X Koordinate spiegeln
        this.ctx.restore(); //den Kontext auf den zuvor gespeicherten Zustand zurücksetzen, einschließlich aller Einstellungen, die zuvor mit save() gesichert wurden
    }

    run() {
        setInterval(() => {
            this.isCollidingEnemies();
            this.isCollidingEndboss();
            this.isCollidingLives();
            this.isCollidingAmmunition();
            this.isCollidingLaser();
            // this.isCollidingCollectableObject(this.level.ammunition, this.character.ammunition);
            // this.isCollidingCollectableObject(this.level.lives);
            this.checkThrowObjects();
            this.checkCharacter();
        }, 100);
    }

    isCollidingEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) { //jump von unten !!
                    this.character.crushing_zombie_sound.play();
                    this.getEnemyIndex(enemy);
                } else {
                    this.character.hit();
                }
                this.livesStatusBar.setPercentage(this.character.lives);
            }
        });
    }

    //Laser + Enemy Collision ========================================= START
    isCollidingLaser() {
        // überprüft, ob es Kollisionen zwischen laser und enemy gibt
        // durchläuft alle shootingObjects und enemies und ruft die handleCollision Fkt auf, wenn eine Kollision festgestellt wird
        this.shootingObject.forEach((shot) => {
            this.level.enemies.forEach((enemy) => {
                if (shot.isColliding(enemy)) {
                    this.handleCollision(shot, enemy);
                }
            });
        });
    }

    handleCollision(shot, enemy) {
        // behandelt die Kollision zwischen shot und enemy
        // ermittelt den Index des betroffenen enemys und des shots
        const enemyIndex = this.level.enemies.findIndex((e) => e === enemy);
        // const endboxIndex = this.level.enemies.findIndex((e) => e === enemy);
        const shotIndex = this.shootingObject.findIndex((s) => s === shot);
        this.removeEnemy(enemyIndex);
        // this.removeEndboss(endboxIndex);
        this.removeLaser(shotIndex);
    }

    removeEnemy(collidedObjectIndex) {
        // entfernt den enemy anhand des angegebenen Indexes aus der Liste der enemies
        if (collidedObjectIndex !== -1) {
            this.level.enemies.splice(collidedObjectIndex, 1);
        }
    }

    removeLaser(collidedObjectIndex) {
        // entfernt den laser anhand des angegebenen Indexes aus der Liste der shootingObjects
        if (collidedObjectIndex !== -1) {
            this.shootingObject.splice(collidedObjectIndex, 1);
        }
    }
    //Laser + Enemy Collision ========================================= END

    // fast dasselbe wie enemies -> zusammenschreiben
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
                console.log('Kollision erkannt');
                this.handleCollisionEndboss(shot, endboss);
            }
        });
    }

    handleCollisionEndboss(shot, endboss) {
        // behandelt die Kollision zwischen shot und enemy
        // ermittelt den Index des betroffenen enemys und des shots
        const endbossIndex = this.level.endboss.findIndex((e) => e === endboss);
        const shotIndex = this.shootingObject.findIndex((s) => s === shot);
        this.hitEndboss(endbossIndex);
        this.removeLaser(shotIndex);
    }

    hitEndboss(endbossIndex) {
        const endboss = this.level.endboss[endbossIndex];
        if (endboss.id === 1) {
            this.character.batteryOne -= 1;
            if (this.character.batteryOne === 0) {
                this.removeEndboss(endbossIndex, endboss.id);
            }
        } else if (endboss.id === 2) {
            this.character.batteryTwo -= 1;
            if (this.character.batteryTwo === 0) {
                this.removeEndboss(endbossIndex, endboss.id);
            }
        } else if (endboss.id === 3) {
            this.character.batteryThree -= 1;
            if (this.character.batteryThree === 0) {
                this.removeEndboss(endbossIndex, endboss.id);
            }
        }

        this.character.batteryAll -= 1;
        this.batteryStatusBar.setPercentage(this.character.batteryAll);
        if (this.character.ammunition === 0 && this.level.endboss.length >= 1) {
            if (!this.gameWon && !this.gameLost && this.shootingObject === 0) {
                this.gameLost = true;
                this.gameOver();
            }
        }
    }

    youWon() {
        this.character.addGameOverContainer();
        document.getElementById('headline').classList.remove('d-none');
        document.getElementById('headline').innerHTML = 'YOU WON!';
        document.getElementById('headline').classList.add('game-over-animation');
    }

    removeEndboss(endbossIndex) {
        if (endbossIndex !== -1) {
            this.level.endboss.splice(endbossIndex, 1);
        }
    }

    getEnemyIndex() {
        // Index von jeweiliger Ammunition bei isColliding
        const collidedObjectIndex = this.level.enemies.findIndex((enemy) => {
            return this.character.isColliding(enemy);
        });
        this.removeEnemy(collidedObjectIndex);
    }

    // //allg: für ammunition + lives
    // isCollidingCollectableObject(collectableObject, collect) {
    //     // console.log(collectableObject, collect); // array -5   | 10
    //     collectableObject.forEach((object) => {
    //         if (this.character.isColliding(object)) { //Ammunition
    //             this.getAmmunitionIndex(object); // 
    //             this.character.collectObject(collect); // 10

    //             this.setStatusBar(collect).setPercentage(this.character.object);
    //             console.log('this.getAmmunitionIndex', collect);
    //         }
    //     });
    // }

    // setStatusBar(collectableObject) {
    //     if (collectableObject == this.level.ammunition) {
    //         return this.ammunitionStatusBar;
    //     } else {
    //         return this.livesStatusBar;
    //     }
    // }

    // getAmmunitionIndex(object) {
    //     // Index von jeweiliger Ammunition bei isColliding
    //     const collidedObjectIndex = this.level.object.findIndex((object) => {
    //         return this.character.isColliding(object);
    //     });
    //     // this.removeAmmunition(collidedObjectIndex);
    // }

    // removeAmmunition(collidedObjectIndex) {
    //     // splice Ammunition an jeweiligen Stelle (index)
    //     if (collidedObjectIndex !== -1) {
    //         this.level.ammunition.splice(collidedObjectIndex, 1);
    //     }
    // }

    //ammunition 
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
        // Index von jeweiliger Ammunition bei isColliding
        const collidedObjectIndex = this.level.ammunition.findIndex((ammunition) => {
            return this.character.isColliding(ammunition);
        });
        this.removeAmmunition(collidedObjectIndex);
    }

    removeAmmunition(collidedObjectIndex) {
        // splice Ammunition an jeweiligen Stelle (index)
        if (collidedObjectIndex !== -1) {
            this.level.ammunition.splice(collidedObjectIndex, 1);
        }
    }

    //lives
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
        // Index von jeweiliger Ammunition bei isColliding
        const collidedObjectIndex = this.level.lives.findIndex((lives) => {
            return this.character.isColliding(lives);
        });
        this.removeLives(collidedObjectIndex);
    }

    removeLives(collidedObjectIndex) {
        // splice Ammunition an jeweiligen Stelle (index)
        if (collidedObjectIndex !== -1) {
            this.level.lives.splice(collidedObjectIndex, 1);
        }
    }

    checkThrowObjects() {
        const batteryIsDepleted = this.character.batteryAll === 0;
        const noEndBossRemaining = this.level.endboss.length === 0;
        const gameOverElementNotPresent = !document.getElementById('gameOver');

        if (this.availableAmmunition()) {
            if (this.keyboard.KEY_TAB && this.character.otherDirection == false) {
                if (!document.getElementById('innerInfoContainer')) {

                    let laser = new ShootingObject(this.character.x + 50, this.character.y);
                    // this.character.laser.otherDirection = true; // bilder spiegeln
                    let shootingWidth = 60;
                    this.character.width = shootingWidth;
                    this.character.playAnimation(this.character.IMAGES_SHOOTING);
                    this.shootingObject.push(laser);
                    this.character.hittedObject('hitEnemy');
                    this.ammunitionStatusBar.setPercentage(this.character.ammunition);

                }
            }
        } else if (batteryIsDepleted && noEndBossRemaining && gameOverElementNotPresent) {
            this.youWon();
        }
    }

    availableAmmunition() {
        return this.character.ammunition > 0
    }

    checkCharacter() {
        if (this.character.x >= 1500 && !this.hasPassed2000) {
            this.hasPassed2000 = true;
            this.level.endboss.forEach((endboss) => {
                endboss.animate();
            });
        }
    }
}