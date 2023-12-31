class Character extends MovableObject {
    world;
    speed = 5;
    height = 80;
    width = 40;
    imageLength;
    state = 'IDLE';


    offset = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        color: 'transparent'
    }


    IMAGES_WALKING = [
        'assets/img/alien/walk/walk1.png',
        'assets/img/alien/walk/walk2.png',
        'assets/img/alien/walk/walk3.png'
    ];


    IMAGES_JUMPING = [
        'assets/img/alien/jump/jump1.png',
        'assets/img/alien/jump/jump2.png',
        'assets/img/alien/jump/jump3.png'
    ];


    IMAGES_DYING = [
        'assets/img/alien/dead/dead1.png',
        'assets/img/alien/dead/dead2.png',
        'assets/img/alien/dead/dead3.png',
        'assets/img/alien/dead/dead4.png',
        'assets/img/alien/dead/dead5.png'
    ];


    IMAGES_HURT = [
        'assets/img/alien/hurt/hurt1.png',
        'assets/img/alien/hurt/hurt2.png',
        'assets/img/alien/hurt/hurt3.png',
        'assets/img/alien/hurt/hurt4.png'
    ];


    IMAGES_SHOOTING = [
        'assets/img/alien/shooting/shoot.png'
    ];


    IMAGES_STANDING = [
        'assets/img/alien/idle/idle1.png',
        'assets/img/alien/idle/idle1.png',
        'assets/img/alien/idle/idle1.png',
        'assets/img/alien/idle/idle1.png',
        'assets/img/alien/idle/idle1.png',
        'assets/img/alien/idle/idle1.png',
        'assets/img/alien/idle/idle1.png',
        'assets/img/alien/idle/idle2.png',
        'assets/img/alien/idle/idle3.png',
        'assets/img/alien/idle/idle2.png'
    ];


    running_sound = new Audio('assets/audio/running.mp3');
    shooting_sound = new Audio('assets/audio/shooting.mp3');
    jumping_sound = new Audio('assets/audio/jump.mp3');
    collecting_ammunition_sound = new Audio('assets/audio/collect.mp3');
    collecting_lives_sound = new Audio('assets/audio/collect.mp3');
    crushing_zombie_sound = new Audio('assets/audio/crushing-zombie.mp3');


    /**
     * Constructor function for initializing the object with various settings.
     */
    constructor() {
        super();
        this.LoadingImages();
        this.applyGravity();
        this.animate();
    }


    /**
     * Loads images into the object by calling different 'loadImage' and 'loadImages' functions.
     */
    LoadingImages() {
        this.loadImage('assets/img/alien/standing.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SHOOTING);
    }


    /**
     * Initiates animations by adding audio settings and setting up stoppable intervals for animations and audios.
     */
    animate() {
        this.addAudioSettings();
        this.setStoppableInterval(this.addAnimations, 100);
        this.setStoppableInterval(this.addAudios, 1000 / 60);
    }


    /**
     * Adds audio functionality for different game actions, such as movement, shooting, and jumping.
     */
    addAudios() {
        if (this.noPauseNoGameOver()) {
            if (!this.world.keyboard.KEY_RIGHT && !this.world.keyboard.KEY_LEFT) {
                this.pauseAudios();
            }
            if (this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x && !this.world.gameIsOver) {
                this.moveRightAndAudio();
            }
            if (this.world.keyboard.KEY_LEFT && this.x > 265 && !this.world.gameIsOver) {
                this.moveLeftAndAudio();
            }
            if (this.world.keyboard.KEY_TAB && !this.world.gameIsOver) {
                this.shootAudio();
            }
            if (this.world.keyboard.KEY_UP && !this.world.gameIsOver) {
                this.jumpAudio();
            }
            this.world.camera_x = -this.x + 200;
        }
    }


    /**
     * Pause audio playback if any sound is playing.
     */
    pauseAudios() {
        this.running_sound.pause();
        this.isSoundPlaying = false;
    }


    /**
     * Move the object to the right and play the running sound if not already playing.
     */
    moveRightAndAudio() {
        this.moveRight();
        this.otherDirection = false;
        if (!this.isSoundPlaying) {
            this.running_sound.play();
            this.isSoundPlaying = true;
        }
    }


    /**
     * Move the object to the left and play the running sound if not already playing.
     */
    moveLeftAndAudio() {
        this.otherDirection = true;
        this.moveLeft();
        if (!this.isSoundPlaying) {
            this.running_sound.play();
            this.isSoundPlaying = true;
        }
    }


    /**
     * Play the shooting sound if not already playing and ammunition is available.
     */
    shootAudio() {
        if (!this.isSoundPlaying && this.ammunition !== 0) {
            this.shooting_sound.play();
            this.isSoundPlaying = true;
        }
    }


    /**
     * Play the jumping sound if not already playing.
     */
    jumpAudio() {
        if (!this.isSoundPlaying) {
            this.jumping_sound.play();
            this.isSoundPlaying = false;
        }
    }


    /**
     * Adds audio settings for various sounds and initializes settings for audio playback.
     */
    addAudioSettings() {
        this.isSoundPlaying = false;
        this.running_sound.loop = true;
        this.running_sound.playbackRate = 2;
        this.shooting_sound.playbackRate = 2;
        this.collecting_lives_sound.playbackRate = 2;
        this.collecting_ammunition_sound.playbackRate = 2;
        this.jumping_sound.playbackRate = 3;
        this.jumping_sound.volume = 0.25;
    }


    /**
     * Adds animations for the object based on its state and game conditions.
     */
    addAnimations() {
        if (this.noPauseNoGameOver()) {
            if (this.isDead()) {
                this.isDyingSettings();
            } else if (this.isHurt() && !this.world.gameIsOver) {
                this.isHurtingSettings();
            } else if (this.isAboveGround() && !this.world.gameIsOver) {
                this.isJumpingSettings();
            } else if (this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT) {
                this.isWalkingSettings();
            } else {
                this.isStandingSettings();
            }
            if (this.world.keyboard.KEY_UP && !this.isAboveGround() && !this.world.gameIsOver) {
                this.speedY = 40;
            }
        }
    }


    /**
     * Sets the settings for the 'dying' state of the object, triggered upon death.
     */
    isDyingSettings() {
        this.height = 50;
        this.width = 70;
        this.y = 350;
        this.setGameOver();
        this.imageLength = 4;
        this.playOnce(this.IMAGES_DYING, this.imageLength);
    }


    /**
     * Sets the game over state and schedules the game over screen after a delay.
     */
    setGameOver() {
        if (this.state !== 'DYING') {
            this.state = 'DYING';
            this.currentImage = 0;
            setTimeout(() => {
                this.gameIsOver = true;
                this.pauseAudios();
                gameOver('youLost');
                this.gameIsOver = false;
            }, 500);
        }
    }


    /**
     * Sets the settings for the 'standing' state of the object.
     */
    isStandingSettings() {
        this.width = 50;
        this.height = 80;
        this.playAnimation(this.IMAGES_STANDING);
    }


    /**
     * Sets the settings for the 'hurt' state of the object, triggered upon getting hurt.
     */
    isHurtingSettings() {
        if (this.state !== 'HURT') {
            this.state = 'HURT';
            this.currentImage = 0;
        }
        this.imageLength = 4;
        this.playOnce(this.IMAGES_HURT, this.imageLength);
    }


    /**
     * Sets the settings for the 'jumping' state of the object, triggered upon jumping.
     */
    isJumpingSettings() {
        this.width = 50;
        if (this.state !== 'JUMPING') {
            this.state = 'JUMPING';
            this.currentImage = 0;
        }
        this.imageLength = 2;
        this.playOnce(this.IMAGES_JUMPING, this.imageLength);
    }


    /**
     * Sets the settings for the 'walking' state of the object, triggered upon walking.
     */
    isWalkingSettings() {
        this.width = 40;
        this.state = 'WALKING';
        this.playAnimation(this.IMAGES_WALKING);
    }


    /**
     * Handles character-endboss collision.
     * @param {Endboss} endboss - The endboss object to check collision with.
     */
    handleCharacterEndbossCollision(endboss) {
        if (this.isColliding(endboss) && !this.world.gameIsOver) {
            this.lives = 0;
            this.world.livesStatusBar.setPercentage(this.lives);
            this.isDyingSettings();
        }
    }


    /**
     * Checks for collisions with ammunition objects in the world and performs actions accordingly.
     */
    isCollidingAmmunition() {
        this.world.level.ammunition.forEach((ammunition) => {
            if (this.isColliding(ammunition)) {
                this.collecting_ammunition_sound.play();
                this.hittedObject('collectAmmunition');
                this.world.ammunitionStatusBar.setPercentage(this.ammunition);
                this.getAmmunitionIndex(ammunition);
            }
        });
    }


    /**
     * Gets the index of the collided ammunition object and removes it from the world.
     */
    getAmmunitionIndex() {
        const collidedObjectIndex = this.world.level.ammunition.findIndex((ammunition) => {
            return this.isColliding(ammunition);
        });
        this.removeAmmunition(collidedObjectIndex);
    }


    /**
     * Removes the ammunition object from the world's ammunition array.
     * @param {number} collidedObjectIndex - The index of the collided ammunition object.
     */
    removeAmmunition(collidedObjectIndex) {
        if (collidedObjectIndex !== -1) {
            this.world.level.ammunition.splice(collidedObjectIndex, 1);
        }
    }


    /**
     * Checks for collisions with lives objects in the world and performs actions accordingly.
     */
    isCollidingLives() {
        this.world.level.lives.forEach((lives) => {
            if (this.isColliding(lives)) {
                this.collecting_lives_sound.play();
                this.hittedObject('collectLives');
                this.world.livesStatusBar.setPercentage(this.lives);
                this.getLivesIndex(lives);
            }
        });
    }


    /**
     * Gets the index of the collided lives object and removes it from the world.
     */
    getLivesIndex() {
        const collidedObjectIndex = this.world.level.lives.findIndex((lives) => {
            return this.isColliding(lives);
        });
        this.removeLives(collidedObjectIndex);
    }


    /**
     * Removes the lives object from the world's lives array.
     * @param {number} collidedObjectIndex - The index of the collided lives object.
     */
    removeLives(collidedObjectIndex) {
        if (collidedObjectIndex !== -1) {
            this.world.level.lives.splice(collidedObjectIndex, 1);
        }
    }
}