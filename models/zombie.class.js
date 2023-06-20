class Zombie extends MovableObject {
    height = 100;
    width = 70;
    y = 370; //standardmäßig und nicht dynamisch

    constructor() {
        super().loadImage('img/enemies/zombie.png');

        this.x = 200 + Math.random() * 500;
        // this.height = 100;
        // this.width = 70;
        // this.y = 330;
    }

    zombie() {
        console.log('Zombie');
    }
}