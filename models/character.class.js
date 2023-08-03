class Character extends MovableObject {
    world;
    speed = 7;
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
        'img/alien/walk/walk1.png',
        'img/alien/walk/walk2.png',
        'img/alien/walk/walk3.png'
    ];


    IMAGES_JUMPING = [
        'img/alien/jump/jump1.png',
        'img/alien/jump/jump2.png',
        'img/alien/jump/jump3.png'
    ];


    IMAGES_DYING = [
        'img/alien/dead/dead1.png',
        'img/alien/dead/dead2.png',
        'img/alien/dead/dead3.png',
        'img/alien/dead/dead4.png',
        'img/alien/dead/dead5.png'
    ];


    IMAGES_HURT = [
        'img/alien/hurt/hurt1.png',
        'img/alien/hurt/hurt2.png',
        'img/alien/hurt/hurt3.png',
        'img/alien/hurt/hurt4.png'
    ];


    IMAGES_SHOOTING = [
        'img/alien/shooting/shoot.png'
    ];


    IMAGES_STANDING = [
        'img/alien/idle/idle1.png',
        'img/alien/idle/idle1.png',
        'img/alien/idle/idle1.png',
        'img/alien/idle/idle1.png',
        'img/alien/idle/idle1.png',
        'img/alien/idle/idle1.png',
        'img/alien/idle/idle1.png',
        'img/alien/idle/idle2.png',
        'img/alien/idle/idle3.png',
        'img/alien/idle/idle2.png'
    ];


    running_sound = new Audio('audio/running.mp3');
    shooting_sound = new Audio('audio/shooting.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    collecting_ammunition_sound = new Audio('audio/collect.mp3');
    collecting_lives_sound = new Audio('audio/collect.mp3');
    crushing_zombie_sound = new Audio('audio/crushing-zombie.mp3');

    /**
     * Constructor function for initializing the object with various settings.
     * It calls functions to load images, apply gravity, and start animations.
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
        this.loadImage('img/alien/standing.png');
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
     * Adjusts camera position based on the object's movement.
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
        if (this.isSoundPlaying) {
            this.running_sound.pause();
            this.isSoundPlaying = false;
        }
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
            } else if (this.world.keyboard.KEY_RIGHT && !this.world.gameIsOver || this.world.keyboard.KEY_LEFT && !this.world.gameIsOver) {
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
     * Checks if the object is moving left or right and not in a dead state.
     * @function
     * @returns {boolean}
     */
    keyLeftOrRightAndNotDead() {
        return this.world.keyboard.KEY_RIGHT && !this.world.gameIsOver || this.world.keyboard.KEY_LEFT && !this.world.gameIsOver;
    }

    /**
     * Sets the settings for the 'dying' state of the object, triggered upon death.
     * Adjusts the object's height, width, and position, sets the 'DYING' state, and initiates the game over process.
     * Plays the dying animation once.
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
     * Executes only if the object is not already in the 'DYING' state.
     */
    setGameOver() {
        if (this.state !== 'DYING') {
            this.state = 'DYING';
            this.currentImage = 0;
            this.world.gameIsOver = true;
            setTimeout(() => {
                gameOver('youLost');
            }, 1000);
        }
    }


    /**
     * Sets the settings for the 'standing' state of the object.
     * Adjusts the object's width and height and plays the standing animation.
     */
    isStandingSettings() {
        this.width = 50;
        this.height = 80;
        this.playAnimation(this.IMAGES_STANDING);
    }


    /**
     * Sets the settings for the 'hurt' state of the object, triggered upon getting hurt.
     * Executes only if the object is not already in the 'HURT' state.
     * Adjusts the object's current image and plays the hurting animation once.
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
     * Adjusts the object's width and sets the 'JUMPING' state if not already in that state.
     * Initiates the jumping animation, playing it once.
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
     * Adjusts the object's width, sets the 'WALKING' state, and plays the walking animation.
     */
    isWalkingSettings() {
        this.width = 40;
        this.state = 'WALKING';
        this.playAnimation(this.IMAGES_WALKING);
    }


    /**
     * Plays the given animation images once if the current image count is less than or equal to the specified image length.
     * @param {Array<string>} images - An array of image paths representing the animation frames.
     * @param {number} imageLength - The length of the animation (number of frames).
     */
    playOnce(images, imageLength) {
        if (this.currentImage <= imageLength) {
            this.playAnimation(images);
        }
    }
}