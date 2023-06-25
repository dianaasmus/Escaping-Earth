class Character extends MovableObject {
    world; // character hat eine Variable namens 'world', womit wir auf die variablen aus der world zugreifen können => keyboard
    speed = 7;
    otherDirection = false; // Character bewegt sich byDefault nach Rechts

    IMAGES_WALKING = [ //Übersichtlicher
        'img/alien/walk1.png',
        'img/alien/walk2.png',
        'img/alien/walk3.png'
        // 'img/alien/walk4.png',
        // 'img/alien/walk5.png',
        // 'img/alien/walk6.png'
    ];
    running_sound = new Audio('audio/running.mp3');

    //wird immer und als erstes von JS aufgerufen
    constructor() {
        super().loadImage('img/alien/standing.png'); //Startbild
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        let isSoundPlaying = false;
        this.running_sound.loop = true; //Audio immer wieder abspielen
        this.running_sound.playbackRate = 2; //Wiedergabegeschwindiigkeit auf 2 erhöhen

        setInterval(() => {
            if (this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false; //bilder nicht spiegeln
                if (!isSoundPlaying) {
                    this.running_sound.play();
                    isSoundPlaying = true;
                }
            }
            if (this.world.keyboard.KEY_LEFT && this.x > 125) {
                this.x -= this.speed;
                this.otherDirection = true; // bilder spiegeln
                if (!isSoundPlaying) {
                    this.running_sound.play();
                    isSoundPlaying = true;
                }
            }
            if (!this.world.keyboard.KEY_RIGHT && !this.world.keyboard.KEY_LEFT) {
                if (isSoundPlaying) {
                    this.running_sound.pause();
                    isSoundPlaying = false;
                }
            }
            this.world.camera_x = -this.x + 125; // x = 125, Alien um 125 verschieben
        }, 1000 / 60);

        setInterval(() => { //jedes bild wird 1 sekunde angezeigt, dann currentImage++
            if (this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT) { //Animation wird abgespielt, wenn keyboard gedrückt
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
}

