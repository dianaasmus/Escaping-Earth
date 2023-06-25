let canvas;
let world;
let keyboard = new Keyboard(); // keyboard in game.js deklarieren

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); //mit world.js "verbinden"
    // music = new Audio('audio/music.mp3');
    console.log('My Character is', world.character);
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.KEY_RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.KEY_LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.KEY_UP = true;
    }
    if (e.keyCode == 32) {
        keyboard.KEY_TAB = true;
    } 
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.KEY_RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.KEY_LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.KEY_UP = false;
    }
    if (e.keyCode == 32) {
        keyboard.KEY_TAB = false;
    } 
});