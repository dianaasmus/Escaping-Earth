let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    // ctx.drawImage(character, 20, 20, 50, 150);

    console.log('My Character is', world.character);
}