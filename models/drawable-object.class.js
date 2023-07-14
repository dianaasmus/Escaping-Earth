class DrawableObject {
    img;
    x = 125;
    currentImage = 0;
    imageCache = {};
    intervalIDs = [];
    otherDirection = false; // Character bewegt sich byDefault nach Rechts

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

    shouldDrawFrame() {
        const allowedClasses = [Character, Zombie, RunningZombie, Endboss, Lives, Ammunition];
        return allowedClasses.some(cls => this instanceof cls);
    }

    drawFrame(ctx) {
        const shouldDrawFrame = this.shouldDrawFrame();

        if (shouldDrawFrame) {
            this.drawRectangle(ctx);
        }
    }

    drawRectangle(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    resolveImageIndex() {
        if (this.percentage == 10) {
            return 5;
        } else if (this.percentage > 8) {
            return 4;
        } else if (this.percentage > 6) {
            return 3;
        } else if (this.percentage > 4) {
            return 2;
        } else if (this.percentage > 2) {
            return 1;
        } else {
            return 0;
        } 
    }

    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time); // funktion (fn) binden (.bind) mit aktuellen wert (this)
        this.intervalIDs.push(id);
    }

    stopGame() {
        this.intervalIDs.forEach(clearInterval);
    }
}