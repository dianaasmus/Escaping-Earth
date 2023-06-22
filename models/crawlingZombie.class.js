class CrawlingZombie extends MovableObject {
    height = 60;
    width = 70;
    y = 230;
    speed = 0.50;
    IMAGES_WALKING = [ //Übersichtlicher
        'img/enemies/crawling-zombie9.png',
        'img/enemies/crawling-zombie8.png',
        'img/enemies/crawling-zombie7.png',
        'img/enemies/crawling-zombie6.png',
        'img/enemies/crawling-zombie5.png',
        'img/enemies/crawling-zombie4.png',
        'img/enemies/crawling-zombie3.png',
        'img/enemies/crawling-zombie2.png',
        'img/enemies/crawling-zombie1.png'
    ];

    constructor() {
        super().loadImage('img/enemies/crawling-zombie1.png');
        this.x = 200 + Math.random() * 500;
        // this.move();
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