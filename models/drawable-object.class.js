class DrawableObject {
    img;
    x = 200;
    currentImage = 0;
    imageCache = {};
    intervalIDs = [];
    otherDirection = false;

    offset = {
        top: 10,
        right: 20,
        bottom: 10,
        left: 10,
        color: 'transparent'
    }


    /**
     * Loads an image from a given path.
     * @param {string} path - The file path of the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads a list of images from an array and stores them in the image cache.
     * @param {string[]} imgArray - The array containing the file paths of the images.
     */
    loadImages(imgArray) {
        imgArray.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Checks if the object should be drawn with a frame based on the instance class.
     * @returns {boolean} - Returns true if the object should be drawn with a frame, otherwise false.
     */
    shouldDrawFrame() {
        const allowedClasses = [Character, Zombie, RunningZombie, Endboss, Lives, Ammunition];
        return allowedClasses.some(cls => this instanceof cls);
    }


    /**
     * Draws the frame and offset of the object if necessary.
     * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas.
     */
    drawFrame(ctx) {
        const shouldDrawFrame = this.shouldDrawFrame();

        if (shouldDrawFrame) {
            this.drawRectangle(ctx);
            this.drawOffset(ctx, this.offset);
        }
    }


    /**
     * Draws the offset frame of the object.
     * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas.
     * @param {Object} offset - The offset values for the frame.
     */
    drawOffset(ctx, offset) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = offset.color;
        ctx.rect(this.x + offset.left, this.y + offset.top, this.width - offset.left - offset.right, this.height - offset.top - offset.bottom);
        ctx.stroke();
    }


    /**
     * Draws a transparent frame around the object.
     * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas.
     */
    drawRectangle(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'transparent';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }


    /**
     * Draws the image of the object.
     * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Calculates the image index based on the percentage and the array of images.
     * @returns {number} - The index of the image in the image array.
     */
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


    /**
     * Sets an interval that can be stopped.
     * @param {Function} fn - The function to be executed in the interval.
     * @param {number} time - The time in milliseconds between intervals.
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
    }


    /**
     * Stops all intervals of the object.
     */
    stopGame() {
        this.intervalIDs.forEach(clearInterval);
    }
}