class RunningZombie extends MovableObject {
    height = 100;
    width = 70;
    y = 300;
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

    /**
     * Creates an instance of RunningZombie.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = 400 + Math.random() * 3260;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    /**
     * Updates the enemy state to indicate that it is dead and shows its dead image.
     */
    showDeadEnemy() {
        this.isDead = true;
        this.height = 40;
        this.width = 70;
        this.y = 360;
        this.loadImage('img/enemies/dead.png');
    }


    /**
     * Starts the zombie's animation.
     */
    animate() {
        this.setStoppableInterval(this.moveLeftRunningZombie, 1000 / 60);
        this.setStoppableInterval(this.playAnimationRunningZombie, 100);
    }

    /**
     * Moves the zombie to the left as long as it is not dead.
     */
    moveLeftRunningZombie() {
        if (!this.isDead) {
            this.moveLeft();
        }
    }

    /**
     * Plays the zombie animation as long as it is not dead.
     */
    playAnimationRunningZombie() {
        if (!this.isDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}