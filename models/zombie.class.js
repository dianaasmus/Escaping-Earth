class Zombie extends MovableObject {
    height = 100;
    width = 70;
    y = 300;
    isDead = false;


    offset = {
        top: 10,
        right: 15,
        bottom: 10,
        left: 25,
        color: 'transparent'
    }


    IMAGES_WALKING = [
        'assets/img/enemies/zombie-walk.png',
        'assets/img/enemies/zombie-walk2.png',
        'assets/img/enemies/zombie-walk3.png',
        'assets/img/enemies/zombie-walk4.png',
        'assets/img/enemies/zombie-walk5.png',
        'assets/img/enemies/zombie-walk6.png'
    ];

    
    /**
     * Creates an instance of Zombie.
     */
    constructor() {
        super().loadImage('assets/img/enemies/zombie-walk.png');
        this.x = 500 + Math.random() * 3260;
        this.speed = 0.15 + Math.random() * 0.5;
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
        this.loadImage('assets/img/enemies/dead.png');
    }

    /**
     * Starts the zombie's animation.
     */
    animate() {
        this.setStoppableInterval(this.moveZombies, 1000 / 60);
        this.setStoppableInterval(this.playAnimationZombies, 200);
    }


    /**
     * Moves the zombies to the left as long as they are not dead.
     */
    moveZombies() {
        if (!this.isDead) {
            this.moveLeft();
        }
    }


    /**
     * Plays the zombie animation as long as they are not dead.
     */
    playAnimationZombies() {
        if (!this.isDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}
