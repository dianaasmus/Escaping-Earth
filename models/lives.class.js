class Lives extends MovableObject {
    height = 60;
    width = 50;

    IMAGES_LIVES = [
        'img/lives/progress-bar/lives-0.png',
        'img/lives/progress-bar/lives-20.png',
        'img/lives/progress-bar/lives-40.png',
        'img/lives/progress-bar/lives-60.png',
        'img/lives/progress-bar/lives-80.png',
        'img/lives/progress-bar/lives-100.png'
    ];

    constructor() {
        super().loadImage('img/lives/14.png');
        this.x = 200 + Math.random() * 2060;

        this.float();
    }
}