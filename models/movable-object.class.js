class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 5;
    shift = -1; // Startverschiebung
    minY = 375; // Untere Grenze des Bewegungsbereichs
    maxY = 400; // Obere Grenze des Bewegungsbereichs
    offsety = 10;
    onCollisionCourse = true;
    lives = 10; //alien
    ammunition = 10; //alien
    lastHit = 0;
    speedX = 1;
    energyOne = 2; //robot
    energyTwo = 2; //robot
    energyThree = 2; //robot
    energyAll = 10; //robot

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isColliding(movableObject) {
        return (this.x + this.width) >= movableObject.x && this.x <= (movableObject.x + movableObject.width) &&
            (this.y + this.offsety + this.height) >= movableObject.y &&
            (this.y + this.offsety) <= (movableObject.y + movableObject.height);
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
        if (this.lives < 0) {
            this.lives = 0;
        } else {
            this.lastHit = new Date().getTime(); //wenn Energie abnimmt geht, aber nicht 0 -> Zeit festhalten -> isHurt()
        }
    }

    // hittedObject(action) {
    //     if (action === 'collectAmmunition') {
    //         this.ammunition += 1;
    //         if (this.ammunition > 10) {
    //             this.ammunition = 10;
    //         }
    //     } else if (action === 'hitEndboss') {
    //         this.energy -= 1;
    //         if (this.energy < 0) {
    //             this.energy = 0;
    //         }
    //     } else if (action === 'collectLives') {
    //         this.lives -= 1;
    //         if (this.lives < 0) {
    //             this.lives = 0;
    //         }
    //     } else if (action === 'hitEnemy') {
    //         this.ammunition -= 1;
    //         if (this.ammunition < 0) {
    //             this.ammunition = 0;
    //         }
    //     }
    // }

    hittedObject(action) {
        switch (action) {
            case 'collectAmmunition':
                this.incrementProperty('ammunition', 1, 0, 10);
                break;
            case 'hitEndboss':
                this.decrementProperty('energy', 1, 0);
                break;
            case 'collectLives':
                this.decrementProperty('lives', 1, 0);
                break;
            case 'hitEnemy':
                this.decrementProperty('ammunition', 1, 0);
                break;
            default:
                console.log('Unknown action');
                break;
        }
    }

    incrementProperty(property, increment, min, max) {
        this[property] += increment;
        this[property] = Math.min(Math.max(this[property], min), max);
    }

    decrementProperty(property, decrement, min) {
        this[property] -= decrement;
        this[property] = Math.max(this[property], min);
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