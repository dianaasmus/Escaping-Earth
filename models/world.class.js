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
        // new BackgroundObject('img/background/Bildschirm­foto 2023-06-20 um 18.55.21.png'),

        new BackgroundObject('img/background/Sky.png'),
        new BackgroundObject('img/background/Background.png'),
        new BackgroundObject('img/background/Foreground.png'),
        new BackgroundObject('img/background/Ground.png')
    ];
    canvas; //innerhalb der Funktion global definieren
    ctx;

    constructor(canvas) {
        canvas.width = 720;
        canvas.height = 480;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //hier wird auf die canvas-variable in zeile 9 zuruückgegriffen
        this.draw();
    }

    draw() {
        //clar canvas before each image
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //background
        // this.backgroundObjects.forEach((layer) => {
        //     this.addToMap(layer);
        // });
        this.addObjectsToMap(this.backgroundObjects);

        //enemies
        // this.enemies.forEach(zombie => { //anstatt for-Schleife -> ForEach 
        //     this.addToMap(zombie);
        // });
        this.addObjectsToMap(this.enemies);

        //character
        this.addToMap(this.character);

        let self = this; //Variable die den Wert this hat, so als würde in requestAnimationFrame 'this' stehen
        requestAnimationFrame(function () { //anonyme/async Funktion, die ausgeführt wird, sobald der obige code ausgeführt wurde
            self.draw(); //this kann nicht anstelle von self verwendet werden, deswegen muss self dort stehen
        }); //Funktion wird so oft aufgerufen, wie es die Grafikkarte des jeweiligen PC es zulässt - sobald Seite geladen ist
    }

    // statt this.objects.forEach()
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(movableObject) {
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height); // (x, y, breite, höhe)
    }
}