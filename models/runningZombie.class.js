class RunningZombie extends MovableObject {
    height = 100;
    width = 70;
    y = 370;
    speed = 1.5;
    IMAGES_WALKING = [ //Übersichtlicher
        'img/enemies/zombieRun1.png',
        'img/enemies/zombieRun2.png',
        'img/enemies/zombieRun3.png',
        'img/enemies/zombieRun4.png',
        'img/enemies/zombieRun5.png',
        'img/enemies/zombieRun6.png',
        'img/enemies/zombieRun7.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = 200 + Math.random() * 2060;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => { //jedes bild wird 1 sekunde angezeigt, dann currentImage++
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}