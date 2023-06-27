class Character extends MovableObject {
    world; // character hat eine Variable namens 'world', womit wir auf die variablen aus der world zugreifen können => keyboard
    speed = 7;
    otherDirection = false; // Character bewegt sich byDefault nach Rechts
    height = 80;
    width = 40;
    // height = 90;
    // width = 50;
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
        'img/alien/jump/jump3.png',
        'img/alien/jump/jump4.png',
        'img/alien/standing.png'
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
    running_sound = new Audio('audio/running.mp3');
    // isSoundPlaying = false;

    //wird immer und als erstes von JS aufgerufen
    constructor() {
        super().loadImage('img/alien/standing.png'); //Startbild
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravitiy();
        this.animate();
    }

    animate() {
        this.addAudios();
        this.addAnimations();
    }

    addAudios() {
        this.isSoundPlaying = false;
        this.running_sound.loop = true; // Audio immer wieder abspielen
        this.running_sound.playbackRate = 2; // Wiedergabegeschwindiigkeit auf 2 erhöhen

        setInterval(() => {
            if (!this.world.keyboard.KEY_RIGHT && !this.world.keyboard.KEY_LEFT) {
                if (this.isSoundPlaying) {
                    this.running_sound.pause();
                    this.isSoundPlaying = false;
                }
                // this.pauseAudio(this.isSoundPlaying);
            }
            if (this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false; //bilder nicht spiegeln

                if (!this.isSoundPlaying) {
                    this.running_sound.play();
                    this.isSoundPlaying = true;
                }
                // this.playAudio(this.isSoundPlaying);
            }
            if (this.world.keyboard.KEY_LEFT && this.x > 125) {
                // this.x -= this.speed;
                this.otherDirection = true; // bilder spiegeln
                this.moveLeft();
                if (!this.isSoundPlaying) {
                    this.running_sound.play();
                    this.isSoundPlaying = true;
                }
            }
            this.world.camera_x = -this.x + 125; // x = 125, Alien um 125 verschieben
        }, 1000 / 60);
    }

    addAnimations() {
        setInterval(() => { //jedes bild wird 1 sekunde angezeigt, dann currentImage++
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DYING);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT) { //Animation wird abgespielt, wenn keyboard gedrückt
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
            if (this.world.keyboard.KEY_UP && !this.isAboveGround()) { //Animation wird abgespielt, wenn keyboard gedrückt
                this.speedY = 40; //jump
            }
        }, 100);
    }
}

