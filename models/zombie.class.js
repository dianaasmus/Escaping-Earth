class Zombie extends MovableObject {
    height = 100;
    width = 70;
    y = 370;

    constructor() {
        super().loadImage('img/enemies/zombie.png');

        this.x = 200 + Math.random() * 500;
        this.move();
    }

    //move zombies 60 f/s um 0.15 pixel
    move(x) {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }

    zombie() {
        console.log('Zombie');
    }
}