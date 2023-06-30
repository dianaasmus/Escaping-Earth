class World {
    character = new Character();
    level = level1; //auf alle variablen in level1 zugreifen + Z. 
    backgroundObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    livesStatusBar = new LivesStatusBar();
    ammunitionStatusBar = new AmmunitionStatusBar();
    shootingObject = [];
    background_music = new Audio('audio/music.mp3');


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
        // this.level.enemies.world = this;
        // console.log(this.level.enemies.world);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.addBackground();
        this.ctx.translate(this.camera_x, 0); //verschiebt die Kameraansicht 
        this.addObjectsToMap(this.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // Back //Elemente werden bei -100 gezeichnet, dann wird camera wieder zurückgesetzt
        // ...space for fixed objects...
        this.addToMap(this.livesStatusBar);
        this.addToMap(this.ammunitionStatusBar);

        this.ctx.translate(this.camera_x, 0); //forward //verschiebt die Kameraansicht 

        this.addObjectsToMap(this.shootingObject);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.lives);
        this.addObjectsToMap(this.level.ammunition);
        // this.addObjectsToMap(this.shootingObject);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0); //Elemente werden bei -100 gezeichnet, dann wird camera wieder zurückgesetzt
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
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
            this.isCollidingLives();
            this.isCollidingAmmunition();
            this.checkThrowObjects();
        }, 100);
    }

    isCollidingEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.livesStatusBar.setPercentage(this.character.lives);
            }
        });
    }

    isCollidingLives() {
        this.level.lives.forEach((lives) => {
            if (this.character.isColliding(lives)) {
                this.character.collectLives();
                this.livesStatusBar.setPercentage(this.character.lives);
            }
        });
    }

    isCollidingAmmunition() {
        this.level.ammunition.forEach((ammunition) => {
            if (this.character.isColliding(ammunition)) {
                this.character.collectAmmunition();
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

    removeObject(object) {
        // return ammunition;
        const collidedObjectIndex = this.level.object.findIndex((ammunition) => {
            return this.character.isColliding(ammunition);
        });
        console.log(collidedObjectIndex);
    }

    isCollidingShootingObject() {
        this.shootingObject.forEach((shot) => {
            if (this.enemies.forEach.isColliding(shot)) {
                this.character.hitEnemy();
                this.ammunitionStatusBar.setPercentage(this.character.ammunition);
            }
        });
    }

    checkThrowObjects() {
        if (this.availableAmmunition()) {
            if (this.keyboard.KEY_TAB) {
                let laser = new ShootingObject(this.character.x, this.character.y);
                this.shootingObject.push(laser);
                this.character.hitEnemy();
                this.ammunitionStatusBar.setPercentage(this.character.ammunition);

            }
        }
    }

    availableAmmunition() {
        return this.character.ammunition > 0
    }
}