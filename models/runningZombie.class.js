class RunningZombie extends MovableObject {
    height = 100;
    width = 70;
    y = 370;
    speed = 1.5;
    isDead = false;


    offset = {
        top: 10,
        right: 15,
        bottom: 10,
        left: 15,
        color: 'transparent'
    }


    IMAGES_WALKING = [
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
        this.x = 400 + Math.random() * 2060;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        this.setStoppableInterval(this.moveLeftRunningZombie, 1000 / 60);
        this.setStoppableInterval(this.playAnimationRunningZombie, 100);
    }


    moveLeftRunningZombie() {
        if (!this.isDead) {
            this.moveLeft();
        }
    }


    playAnimationRunningZombie() {
        if (!this.isDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}