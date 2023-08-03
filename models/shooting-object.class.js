class ShootingObject extends MovableObject {
    
    /**
     * Creates an instance of ShootingObject.
     * @param {number} x - The horizontal position of the projectile.
     * @param {number} y - The vertical position of the projectile.
     * @param {boolean} otherdirection - Specifies whether the projectile flies in the opposite direction (left instead of right).
     */
    constructor(x, y, otherdirection) {
        super().loadImage('img/ammunition/attack/ammunition-attack.png');
        this.x = x;
        this.y = y + 30;
        this.width = 30;
        this.height = 30;
        this.shoot(otherdirection);
    }

    /**
     * Initiates the shot of the projectile.
     * @param {boolean} otherdirection - Specifies whether the projectile flies in the opposite direction (left instead of right).
     */
    shoot(otherdirection) {
        this.speedX = 50;
        if (otherdirection) {
            this.otherDirection = true;
            this.setStoppableInterval(this.moveShotLeft, 50);
        } else {
            this.setStoppableInterval(this.moveShotRight, 50);
        }
    }

    /**
     * Moves the projectile to the right.
     */
    moveShotRight() {
        this.x += 20;
    }

    /**
     * Moves the projectile to the left.
     */
    moveShotLeft() {
        this.x -= 20;
    }
}
