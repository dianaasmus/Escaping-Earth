class CrawlingZombie extends MovableObject {
    height = 70;
    width = 80;
    y = 230;

    constructor() {
        super().loadImage('img/enemies/crawling-zombie1.png');
        this.x = 200 + Math.random() * 500;
    }

    zombie() {
        console.log('Zombie');
    }
}