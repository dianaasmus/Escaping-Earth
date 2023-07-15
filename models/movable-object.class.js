class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 5;

    onCollisionCourse = true;
    lives = 10; //alien
    ammunition = 10; //alien
    lastHit = 0;
    speedX = 1;

    batteryOne = 3; //robot
    batteryTwo = 4; //robot
    batteryThree = 3; //robot
    batteryAll = 10; //robot


    moveRight() {
        if (!document.getElementById('innerInfoContainer') && !document.getElementById('gameOver')) {
            this.x += this.speed;
        }
    }


    moveLeft() {
        if (!document.getElementById('innerInfoContainer') && !document.getElementById('gameOver')) {
            this.x -= this.speed;
        }
    }


    isColliding(movableObject) {
        return (
            this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom
        );    
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; //Modulo: let i = 0 % 6; => Stelle[0] 0, rest 0 ... Stelle [1] 0, rest 1 ... 
        // Stelle [7] = 1, rest 1 => nur 1 wird aufgerufen!! 
        let path = images[i];
        this.img = this.imageCache[path]; //wenn img mit dem image im imageCache übereinstimmt => currentImage++
        this.currentImage++;
    }


    applyGravity() {
        this.y = 290;
        this.setStoppableInterval(this.gravity, 1000 / 25);
    }


    gravity() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY; //390 - 0 = 390 // 390 - (-1) = 391 // 391 - 0 = 391
            this.speedY -= this.acceleration; // 0 - 1 = -1 // -1 - (-1)  = 0
        }
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


    hittedObject(action) {
        switch (action) {
            case 'collectAmmunition':
                this.incrementProperty('ammunition', 1, 0, 10); // 1 = wert ehrhöhen/verringern,  0 = minimalwert, 10 = maximalwert
                break;
            case 'hitEndboss':
                this.decrementProperty('energy', 1, 0);
                break;
            case 'collectLives':
                this.incrementProperty('lives', 1, 0, 10);
                break;
            case 'hitEnemy':
                this.decrementProperty('ammunition', 1, 0);
                break;
        }
    }


    incrementProperty(property, increment, min, max) {
        this[property] += increment; // this[property] ≠ this.property ( z. B this['ammunition']) -> dynamische Referenz 
        // -> wird verwendet, wenn der Name der Eigenschaft zur Entwicklungszeit nicht bekannt ist oder zur Laufzeit variieren kann
        this[property] = Math.min(Math.max(this[property], min), max); //Math.min(this.ammunition, 0),10)
        //1. größere Wert ermitteln: Math.max(this[property], min)
        //2. this['ammunition'], 0 -> Math.max(8, 0)
        //3. Math.min((8, 0), 10) -> kleinere Wert ermittelt
        //4. Ergebnis Math.max = 8 -> Ergebnis Math.min((8), 10) -> Ergebnis: 8 (8 ist der kleinere Wert der beiden Werte)
    }


    decrementProperty(property, decrement, min) {
        this[property] -= decrement;
        this[property] = Math.max(this[property], min);
        //1. this[property] und min: größere wert zwischen den beiden werten ermittelt
        //2. Math.max(this.enery, 0) 
        //3. Math.max(8, 0) 
        //-> this.energy = 8;
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