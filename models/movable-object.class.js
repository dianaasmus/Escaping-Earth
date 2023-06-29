class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 5;
    shift = -1; // Startverschiebung
    minY = 385; // Untere Grenze des Bewegungsbereichs
    maxY = 400; // Obere Grenze des Bewegungsbereichs
    offsety = 10;
    onCollisionCourse = true;
    lives = 10;
    // lives = 10;
    lastHit = 0;

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isColliding(movableObject) {
        return (this.x + this.width) >= movableObject.x && this.x <= (movableObject.x + movableObject.width) &&
            (this.y + this.offsety + this.height) >= movableObject.y &&
            (this.y + this.offsety) <= (movableObject.y + movableObject.height) &&
            movableObject.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    float() {
        setInterval(() => {
            this.y += this.shift; // Verschiebung hinzufügen 
            // += : y wird um shift(-1) erhöht und gleichzeitig das Ergebnis als Wert erhalten

            if (this.y <= this.minY || this.y >= this.maxY) {
                this.shift *= -1; // Ändere die Richtung der Verschiebung (-1 * (-1)) => shift ≠ -1 => shift = 1;
            }
        }, 1000 / 15);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; //Modulo: let i = 0 % 6; => Stelle[0] 0, rest 0 ... Stelle [1] 0, rest 1 ... 
        // Stelle [7] = 1, rest 1 => nur 1 wird aufgerufen!! 
        let path = images[i];
        this.img = this.imageCache[path]; //wenn img mit dem image im imageCache übereinstimmt => currentImage++
        this.currentImage++;
    }

    applyGravitiy() {
        this.y = 290;
        setInterval(() => { //390 // 390 // 391 
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY; //390 - 0 = 390 // 390 - (-1) = 391 // 391 - 0 = 391
                this.speedY -= this.acceleration; // 0 - 1 = -1 // -1 - (-1)  = 0
            }
        }, 1000 / 25); //25 mal pro Sekunde
    }

    isAboveGround() {
        return this.y < 390;
    }

    hit() {
        this.lives -= 1;
        if(this.lives < 0) {
            this.lives = 0; 
        } else {
            this.lastHit = new Date().getTime(); //wenn Energie abnimmt geht, aber nicht 0 -> Zeit festhalten -> isHurt()
        }
    }

    collectLives() {
        this.lives += 1;
        if(this.lives > 10) {
            this.lives = 10; 
        }
    }

    isDead() {
        return this.lives == 0;
    }

    isHurt() { // Falls Zeit unter 1 sekunde -> true -> Graphik anzeigen
        let timepassed = new Date().getTime() - this.lastHit; // differenz in ms 
        timepassed = timepassed / 1000; // differenz in s
        return timepassed < 1; //animation für 1 sek anzeigen
    }
}