class MovableObject {
    x = 125;
    y = 390;
    img;
    height = 80;
    width = 40;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;

    loadImage(path) {
        this.img = new Image(); //Fkt von JS - wie: this.img = doc.getEBID... <img id="image">
        this.img.src = path;
    }

    loadImages(imgArray) {
        imgArray.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveObject() {
        console.log('My moving Character is' + character);
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    float() {
        let shift = -1; // Startverschiebung
        let minY = 385; // Untere Grenze des Bewegungsbereichs
        let maxY = 400; // Obere Grenze des Bewegungsbereichs

        setInterval(() => {
            this.y += shift; // Verschiebung hinzufügen 
            // += : y wird um shift(-1) erhöht und gleichzeitig das Ergebnis als Wert erhalten

            if (this.y <= minY || this.y >= maxY) {
                shift *= -1; // Ändere die Richtung der Verschiebung (-1 * (-1)) => shift ≠ -1 => shift = 1;
            }
        }, 1000 / 15);
    }

    playAnimation() {
        let i = this.currentImage % this.IMAGES_WALKING.length; //Modulo: let i = 0 % 6; => Stelle[0] 0, rest 0 ... Stelle [1] 0, rest 1 ... 
        // Stelle [7] = 1, rest 1 => nur 1 wird aufgerufen!! 
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path]; //wenn img mit dem image im imageCache übereinstimmt => currentImage++
        this.currentImage++;
    }
}