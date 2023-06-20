class World {
    character = new Character();
    // enemies = new Enemies();
    enemies = [
        new Zombie(),
        new Zombie(),
        new Zombie()
    ];
    canvas; //innerhalb der FUnktio global definieren
    ctx;

    constructor(canvas) {
        canvas.width = 720;
        canvas.height = 480;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //hier wird auf die canvas-variable in zeile 9 zuruückgegriffen
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.enemies.forEach(enemy => { //anstatt for-Schleife -> ForEach 
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height); // (x, y, breite, höhe)
        })

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height); // (x, y, breite, höhe)

        let self = this; //Variable die den Wert this hat, so als würde in requestAnimationFrame 'this' stehen
        requestAnimationFrame(function() { //anonyme/async Funktion, die ausgeführt wird, sobald der obige code ausgeführt wurde
            self.draw(); //this kann nicht anstelle von self verwendet werden, deswegen muss self dort stehen
        }); //Funktion wird so oft aufgerufen, wie es die Grafikkarte des jeweiligen PC es zulässt - sobald Seite geladen ist
    }
}