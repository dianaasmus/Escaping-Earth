class World {
    character = new Character();
    // enemies = level1.enemies;
    // backgrounds = level1.backgrounds;
    // positions = level1.positions; // Hintergrund 4 mal einfügen
    level = level1; //auf alle variablen in level1 zugreifen + Z. 
    backgroundObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
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
        this.checkCollisions();
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
        this.statusBar.world = this; //this.character.world = neue Variable. die auf das aktuelle Objekt (world) verweist.
        // this.level.enemies.world = this;
        // console.log(this.level.enemies.world);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.addBackground();
        this.ctx.translate(this.camera_x, 0); //verschiebt die Kameraansicht 
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collection);
        this.addToMap(this.character);
        this.addToMap(this.statusBar);
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

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if ( this.character.isColliding(enemy)) {
                    // console.log('collision with character: ', enemy);
                    // this.character.energy -= 1;
                    this.character.hit();
                    console.log('collision with character energy ', this.character.energy);
                }
            });
        }, 500);
        setInterval(() => {
            this.level.collection.forEach((collect) => {
                
                if ( this.character.isColliding(collect)) {
                    // console.log('collision with character: ', enemy);
                    // this.character.hit();
                    console.log('collision with character lives ', this.character.lives);
                }
            });
        }, 500);
    }
}