class MovableObject {
    x = 50;
    y = 100;
    img;
    height = 30;
    width = 20;

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