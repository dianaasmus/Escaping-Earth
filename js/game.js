let canvas;
let ctx;
let world = new World();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // character.src= '../img/alien/run1.png';
    // ctx.drawImage(character, 20, 20, 50, 150);

    console.log('My Character is', world.character);
}