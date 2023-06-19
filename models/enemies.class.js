class Zombie extends MovableObject {
    x = 100;

    constructor() {
        super().loadImage('img/enemies/zombie.png');
    }

    zombie() {
        console.log('ZOmbie');
    }
    
} 