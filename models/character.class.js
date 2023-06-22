class Character extends MovableObject {
    IMAGES_WALKING = [ //Übersichtlicher
        'img/alien/walk1.png',
        'img/alien/walk2.png',
        'img/alien/walk3.png'
        // 'img/alien/walk4.png',
        // 'img/alien/walk5.png',
        // 'img/alien/walk6.png'
    ];
    currentImage = 0;

    //wird immer und als erstes von JS aufgerufen
    constructor() {
        super().loadImage('img/alien/walk1.png'); //Startbild
        this.loadImages(this.IMAGES_WALKING);
        this.animateImages();
    }

    animateImages() {
        setInterval(() => { //jedes bild wird 1 sekunde angezeigt, dann currentImage++
            let i = this.currentImage % this.IMAGES_WALKING.length; //Modulo: let i = 0 % 6; => Stelle[0] 0, rest 0 ... Stelle [1] 0, rest 1 ... 
            // Stelle [7] = 1, rest 1 => nur 1 wird aufgerufen!! 
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path]; //wenn img mit dem image im imageCache übereinstimmt => currentImage++
            this.currentImage++;
        }, 200);
    }

    jump() {

    }
}