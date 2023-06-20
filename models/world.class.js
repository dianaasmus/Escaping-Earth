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
        new BackgroundObject('img/background/Sky.png'),
        new BackgroundObject('img/background/Background.png'),
        new BackgroundObject('img/background/Foreground.png'),
        new BackgroundObject('img/background/Ground.png')
    ];
    canvas;
    ctx;

    constructor(canvas) {
        canvas.width = 720;
        canvas.height = 480;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
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