class DrawableObject {
    img;
    x = 150;
    currentImage = 0;
    imageCache = {};
    intervalIDs = [];
    otherDirection = false;


    offset = {
        top : 10,
        right : 20,
        bottom: 10,
        left: 10,
        color: 'red'
    }


    loadImage(path) {
        this.img = new Image();
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
            this.drawOffset(ctx, this.offset);
        }
    }


    drawOffset(ctx, offset) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = offset.color;
        ctx.rect(this.x + offset.left, this.y + offset.top, this.width - offset.left - offset.right, this.height - offset.top - offset.bottom);
        ctx.stroke();
    }


    drawRectangle(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'transparent';
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
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
    }

    
    stopGame() {
        this.intervalIDs.forEach(clearInterval);
    }
}