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
        'img/alien/shooting/attack6.png'
    ];


    IMAGES_STANDING = [
        'img/alien/idle/IDLE1.png',
        'img/alien/idle/IDLE1.png',
        'img/alien/idle/IDLE1.png',
        'img/alien/idle/IDLE1.png',
        'img/alien/idle/IDLE1.png',
        'img/alien/idle/IDLE1.png',
        'img/alien/idle/IDLE1.png',
        'img/alien/idle/IDLE2.png',
        'img/alien/idle/IDLE3.png',
        'img/alien/idle/IDLE2.png'
    ];


    running_sound = new Audio('audio/running.mp3');
    shooting_sound = new Audio('audio/shooting.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    collecting_ammunition_sound = new Audio('audio/collect.mp3');
    collecting_lives_sound = new Audio('audio/collect.mp3');
    crushing_zombie_sound = new Audio('audio/crushing-zombie.mp3');


    constructor() {
        super();
        this.LoadingImages();
        this.applyGravity();
        this.animate();

    }


    LoadingImages() {
        this.loadImage('img/alien/standing.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SHOOTING);
    }


    animate() {
        this.addAudioSettings();
        this.setStoppableInterval(this.addAudios, 1000 / 60);
        this.setStoppableInterval(this.addAnimations, 100);
    }


    addAudios() {
        if (this.noPauseNoGameOver()) {
            if (!this.world.keyboard.KEY_RIGHT && !this.world.keyboard.KEY_LEFT) {
                this.pauseAudios();
            }
            if (this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRightAndAudio();
            }
            if (this.world.keyboard.KEY_LEFT && this.x > 125) {
                this.moveLeftAndAudio();
            }
            if (this.world.keyboard.KEY_TAB) {
                this.shootAudio();
            }
            if (this.world.keyboard.KEY_UP) {
                this.jumpAudio();
            }
            this.world.camera_x = -this.x + 122;
        }
    }


    pauseAudios() {
        if (this.isSoundPlaying) {
            this.running_sound.pause();
            this.isSoundPlaying = false;
        }
    }


    moveRightAndAudio() {
        this.moveRight();
        this.otherDirection = false;
        if (!this.isSoundPlaying) {
            this.running_sound.play();
            this.isSoundPlaying = true;
        }
    }


    moveLeftAndAudio() {
        this.otherDirection = true;
        this.moveLeft();
        if (!this.isSoundPlaying) {
            this.running_sound.play();
            this.isSoundPlaying = true;
        }
    }


    shootAudio() {
        if (!this.isSoundPlaying && this.ammunition !== 0) {
            this.shooting_sound.play();
            this.isSoundPlaying = true;
        }
    }


    jumpAudio() {
        if (!this.isSoundPlaying) {
            this.jumping_sound.play();
            this.isSoundPlaying = false;
        }
    }


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


    addAnimations() {
        if (this.noPauseNoGameOver()) {
            if (this.isDead()) {
                this.isDyingSettings();
            } else if (this.isHurt()) {
                this.isHurtingSettings();
            } else if (this.isAboveGround()) {
                this.isJumpingSettings();
            } else if (this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT) {
                this.isWalkingSettings();
            } else {
                this.isStandingSettings();
            }
            if (this.world.keyboard.KEY_UP && !this.isAboveGround()) {
                this.speedY = 40;
            }
        }
    }


    isDyingSettings() {
        this.height = 50;
        this.width = 70;
        this.y = 420;
        this.setGameOver();
        this.imageLength = 4;
        this.playOnce(this.IMAGES_DYING, this.imageLength);
    }


    setGameOver() {
        if (this.state !== 'DYING') {
            this.state = 'DYING';
            this.currentImage = 0;
            setTimeout(() => {
                gameOver('youLost');
            }, 1000);
        }
    }


    isStandingSettings() {
        this.width = 50;
        this.height = 80;
        this.playAnimation(this.IMAGES_STANDING);
    }


    isHurtingSettings() {
        if (this.state !== 'HURT') {
            this.state = 'HURT';
            this.currentImage = 0;
        }
        this.imageLength = 4;
        this.playOnce(this.IMAGES_HURT, this.imageLength);
    }


    isJumpingSettings() {
        this.width = 50;
        if (this.state !== 'JUMPING') {
            this.state = 'JUMPING';
            this.currentImage = 0;
        }
        this.imageLength = 2;
        this.playOnce(this.IMAGES_JUMPING, this.imageLength);
    }


    isWalkingSettings() {
        this.width = 40;
        this.state = 'WALKING';
        this.playAnimation(this.IMAGES_WALKING);
    }


    playOnce(images, imageLength) {
        if (this.currentImage <= imageLength) {
            this.playAnimation(images);
        }
    }
}