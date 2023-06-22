class World {
    character = new Character();
    enemies = level1.enemies;
    backgrounds = level1.backgrounds;
    positions = level1.positions; // Hintergrund 4 mal einfügen
    backgroundObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) { //von game.js aufnehmen
        canvas.width = 720;
        canvas.height = 480;
        this.ctx = canvas.getContext('2d');
        this.createBackgroundObjects(); //Hintergrund erstelllen -> Fkt
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    createBackgroundObjects() {
        for (let i = 0; i < this.backgrounds.length; i++) {
            for (let j = 0; j < this.positions.length; j++) {
                const background = this.backgrounds[i];
                const position = this.positions[j];
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
        this.ctx.translate(this.camera_x, 0); //verschiebt die Kameraansicht 
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);
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
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height); // 
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

    // draw(ctx) {
    //     ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height); // 
    // }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1; // X Koordinate spiegeln
        this.ctx.restore(); //den Kontext auf den zuvor gespeicherten Zustand zurücksetzen, einschließlich aller Einstellungen, die zuvor mit save() gesichert wurden
    }
}