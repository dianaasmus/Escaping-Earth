class Zombie extends MovableObject {
    height = 100;
    width = 70;
    y = 370;
    IMAGES_WALKING = [
        'img/enemies/zombie-walk.png',
        'img/enemies/zombie-walk2.png',
        'img/enemies/zombie-walk3.png',
        'img/enemies/zombie-walk4.png',
        'img/enemies/zombie-walk5.png',
        // 'img/enemies/zombie-walk6.png'
        'img/enemies/zombie-walk7.png'
    ];

    constructor() {
        super().loadImage('img/enemies/zombie-walk.png');
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5; //unterschiedliche Geschw. Zahl zw. 0.15 und 0.65
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
    
    animate() {
        this.moveLeft();
        setInterval(() => { //jedes bild wird 1 sekunde angezeigt, dann currentImage++
            let i = this.currentImage % this.IMAGES_WALKING.length; //Modulo: let i = 0 % 6; => Stelle[0] 0, rest 0 ... Stelle [1] 0, rest 1 ... 
            // Stelle [7] = 1, rest 1 => nur 1 wird aufgerufen!! 
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path]; //wenn img mit dem image im imageCache übereinstimmt => currentImage++
            this.currentImage++;
        }, 200);
    }

    zombie() {
        console.log('Zombie');
    }
}