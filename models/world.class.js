class World {
    character = new Character();
    enemies = [
        new Zombie(),
        new Zombie(),
        new CrawlingZombie(), 
        new Zombie(),
        new CrawlingZombie()
    ];
    backgroundObjects = [
        new BackgroundObject('img/background/Sky.png' ),
        new BackgroundObject('img/background/Background.png'),
        new BackgroundObject('img/background/Foreground.png'),
        new BackgroundObject('img/background/Ground.png')
    ];
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) { //von game.js aufnehmen
        canvas.width = 720;
        canvas.height = 480;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() { // character hat eine Variable namens 'world', womit wir auf die variablen aus der world zugreifen können => keyboard
        this.character.world = this; //this.character.world = neue Variable. die auf das aktuelle Objekt (world) verweist.
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

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
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    }
}