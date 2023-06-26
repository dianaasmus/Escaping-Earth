class Character extends MovableObject {
    world; // character hat eine Variable namens 'world', womit wir auf die variablen aus der world zugreifen können => keyboard
    speed = 7;
    otherDirection = false; // Character bewegt sich byDefault nach Rechts
    height = 80;
    width = 40;
    // height = 90;
    // width = 50;
    IMAGES_WALKING = [ //Übersichtlicher
        'img/alien/walk1.png',
        'img/alien/walk2.png',
        'img/alien/walk3.png'
        // 'img/alien/walk4.png',
        // 'img/alien/walk5.png',
        // 'img/alien/walk6.png'
    ];
    IMAGES_JUMPING = [ //Übersichtlicher
        'img/alien/jump1.png',
        'img/alien/jump2.png',
        'img/alien/jump3.png',
        'img/alien/jump4.png',
        'img/alien/standing.png'
    ];
    running_sound = new Audio('audio/running.mp3');
    // isSoundPlaying = false;

    //wird immer und als erstes von JS aufgerufen
    constructor() {
        super().loadImage('img/alien/standing.png'); //Startbild
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravitiy();
        this.animate();
    }

    animate() {
        this.addAudios();
        this.addAnimations();
    }

    addAudios() {
        this.isSoundPlaying = false;
        this.running_sound.loop = true; //Audio immer wieder abspielen
        this.running_sound.playbackRate = 2; //Wiedergabegeschwindiigkeit auf 2 erhöhen

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

    pauseAudio(isSoundPlaying) {
        if (isSoundPlaying) {
            this.running_sound.pause();
            isSoundPlaying = false;
        }
    }

    playAudio(isSoundPlaying) {
        this.x += this.speed;
        this.otherDirection = false; //bilder nicht spiegeln
        if (!isSoundPlaying) {
            this.running_sound.play();
            isSoundPlaying = true;
        }
    }

    addAnimations() {
        setInterval(() => { //jedes bild wird 1 sekunde angezeigt, dann currentImage++
            if (this.isAboveGround()) {
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

