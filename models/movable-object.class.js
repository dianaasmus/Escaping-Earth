class MovableObject {
    x = 125;
    y = 350;
    img;
    height = 80;
    width = 40;

    loadImage(path) {
        this.img = new Image(); //Fkt von JS - wie: this.img = doc.getEBID... <img id="image">
        this.img.src = path;
    }

    moveObject() {
        console.log('My moving Character is' + character);
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }
}