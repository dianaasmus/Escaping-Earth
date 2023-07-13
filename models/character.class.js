class Character extends MovableObject {
    world; // character hat eine Variable namens 'world', womit wir auf die variablen aus der world zugreifen können => keyboard
    speed = 7;
    otherDirection = false; // Character bewegt sich byDefault nach Rechts
    height = 80;
    width = 40;
    imageLength;

    IMAGES_WALKING = [ //Übersichtlicher
        'img/alien/walk/walk1.png',
        'img/alien/walk/walk2.png',
        'img/alien/walk/walk3.png'
        // 'img/alien/walk/walk4.png',
        // 'img/alien/walk/walk5.png',
        // 'img/alien/walk/walk6.png'
    ];
    IMAGES_JUMPING = [ //Übersichtlicher
        'img/alien/jump/jump1.png',
        'img/alien/jump/jump2.png',
        // 'img/alien/jump/jump3.png',
        'img/alien/jump/jump4.png'

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
        // 'img/alien/shooting/attack1.png',
        // 'img/alien/shooting/attack2.png',
        // 'img/alien/shooting/attack3.png',
        // 'img/alien/shooting/attack4.png',
        // 'img/alien/shooting/attack5.png',
        'img/alien/shooting/attack6.png'
        // 'img/alien/shooting/attack7.png',
        // 'img/alien/shooting/attack8.png',
        // 'img/alien/shooting/attack9.png'
    ];
    running_sound = new Audio('audio/running.mp3');
    shooting_sound = new Audio('audio/shooting.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    collecting_ammunition_sound = new Audio('audio/collect.mp3');
    collecting_lives_sound = new Audio('audio/collect.mp3');
    crushing_zombie_sound = new Audio('audio/crushing-zombie.mp3');
    state = 'IDLE';
    // isSoundPlaying = false;

    //wird immer und als erstes von JS aufgerufen
    constructor() {
        super();
        this.loadImage('img/alien/standing.png'); //Startbild
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SHOOTING);
        this.applyGravity();
        this.animate();
    }

    animate() {
        console.log(this.world);
        this.addAudioSettings();
        // this.addAudios();
        this.setStoppableInterval(this.addAudios, 1000 / 60);
        this.setStoppableInterval(this.addAnimations, 100);
        // this.addAnimations();
        // this.setStoppableInterval(this.addAnimations, 100);
    }

    addAudios() {
        if (!document.getElementById('innerInfoContainer') && !document.getElementById('gameOver')) {
            if (!this.world.keyboard.KEY_RIGHT && !this.world.keyboard.KEY_LEFT) {
                if (this.isSoundPlaying) {
                    this.running_sound.pause();
                    this.isSoundPlaying = false;
                }
            }
            if (this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false; //bilder nicht spiegeln

                if (!this.isSoundPlaying) {
                    this.running_sound.play();
                    this.isSoundPlaying = true;
                }
            }
            if (this.world.keyboard.KEY_LEFT && this.x > 125) {
                this.otherDirection = true; // bilder spiegeln
                this.moveLeft();
                if (!this.isSoundPlaying) {
                    this.running_sound.play();
                    this.isSoundPlaying = true;
                }
            }
            if (this.world.keyboard.KEY_TAB && this.otherDirection == false) {
                if (!this.isSoundPlaying && this.ammunition !== 0) {
                    this.shooting_sound.play();
                    this.isSoundPlaying = false;
                }
            }
            if (this.world.keyboard.KEY_UP) {
                if (!this.isSoundPlaying) {
                    this.jumping_sound.play();
                    this.isSoundPlaying = false;
                }
            }
            this.world.camera_x = -this.x + 125; // x = 125, Alien um 125 verschieben
        }
    }

    addAudioSettings() {
        this.isSoundPlaying = false;
        this.running_sound.loop = true; // Audio immer wieder abspielen
        this.running_sound.playbackRate = 2; // Wiedergabegeschwindiigkeit auf 2 erhöhen
        this.shooting_sound.playbackRate = 2;
        this.collecting_lives_sound.playbackRate = 2;
        this.collecting_ammunition_sound.playbackRate = 2;
        this.jumping_sound.playbackRate = 3;
        this.jumping_sound.volume = 0.25;
    }

    addAnimations() {
        if (!document.getElementById('innerInfoContainer') && !document.getElementById('gameOver')) {
            if (this.isDead()) {
                this.height = 50;
                this.width = 70;
                this.y = 420;
                if (this.state !== 'DYING') {
                    this.state = 'DYING';
                    this.currentImage = 0;
                    this.setStoppableInterval(this.gameOver, 1000);
                }
                this.imageLength = 4;
                this.playOnce(this.IMAGES_DYING, this.imageLength);
            } else if (this.isHurt()) {
                if (this.state !== 'HURT') {
                    this.state = 'HURT';
                    this.currentImage = 0;
                }
                this.imageLength = 4;
                this.playOnce(this.IMAGES_HURT, this.imageLength);
            } else if (this.isAboveGround()) {
                this.width = 50;
                if (this.state !== 'JUMPING') {
                    this.state = 'JUMPING';
                    this.currentImage = 0;
                }
                this.imageLength = 2;
                this.playOnce(this.IMAGES_JUMPING, this.imageLength);
            } else if (this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT) { //Animation wird abgespielt, wenn keyboard gedrückt
                this.width = 40;
                this.state = 'WALKING';
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.world.keyboard.KEY_UP && !this.isAboveGround()) { //Animation wird abgespielt, wenn keyboard gedrückt
                this.speedY = 40; //jump
            }
        }
    }

    playOnce(images, imageLength) {
        if (this.currentImage <= imageLength) {
            this.playAnimation(images);
        }
    }

    gameOver() {
        if (!document.getElementById('gameOver')) {
            this.addGameOverContainer();
            document.getElementById('headline').classList.remove('d-none');
            document.getElementById('headline').innerHTML = 'You Lost';
            document.getElementById('headline').classList.add('game-over-animation');
            document.getElementById('info-icon').disabled = true;
            document.getElementById('audio-icon').disabled = true;
        }
    }

    startAgain() {
        let headline = document.getElementById('headline');
        headline.classList.add('headline');
        headline.innerHTML = 'Escaping Earth';
        document.getElementById('info-icon').disabled = false;
        document.getElementById('audio-icon').disabled = false;
    }

    addGameOverContainer() {
        startScreen.innerHTML += `<div id="gameOver"><button onclick="${this.startAgain()}" id="gameOverBtn">START AGAIN</button></div>`;
    }
}