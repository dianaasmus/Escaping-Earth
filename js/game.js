let canvas;
let world;
let keyboard = new Keyboard(); // keyboard in game.js deklarieren
let isNextSiteVisible = false; // Variable für den aktuellen Zustand
// let loadingArray = [''];

window.addEventListener('load', function () {
    var loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'none';
});

function startGame() {
    startBtn.disabled = true;
    headline.classList.add('animation');
    startScreen.classList.add('d-none');
    init();
}

function openInfo() {
    document.getElementById('startBtn').classList.add('d-none'); //disable while loading
    let infoContainer = document.getElementById("info-container");
    if (infoContainer) {
        infoContainer.remove(); //toggle
        document.getElementById('startBtn').classList.remove('d-none');
    } else {
        document.body.innerHTML += gameInfo();
    }
}

function gameInfo() {
    return `
    <div id="info-container">
        <div id="info-content">
            <div id="gameSettings" class="d-none">
                <div class="column">                
                    <div class="align">
                        <img src="img/start-screen/arrow.png" class="key-icons">
                        <p>JUMP</p>
                    </div>
                    <div class="align">
                        <img src="img/start-screen/arrow-left.png" class="key-icons">
                        <p>LEFT</p>
                    </div>
                    <div class="align">
                        <img src="img/start-screen/arrow-right.png" class="key-icons">
                        <p>RIGHT</p>
                    </div>
                    <div class="align">
                        <div class="key-icon"></div>
                        <p>SHOOT</p>
                    </div>
                </div>
                <div class="column">
                    <div class="align">
                        <img src="img/lives/14.png" class="collect-icons">
                        <p>LIVES</p>
                    </div>
                    <div class="align">
                        <img src="img/ammunition/13.png" class="collect-icons">
                        <p>AMMUNITION</p>
                    </div>
                </div>
            </div>
                <p id="gameDescription">It is June 3245 when, suddenly, an extraterrestrial being crashes its UFO over Earth. Trapped in a world full of zombies and robots, 'June-3245' strives to fight for survival and escape from the planet. Help him defeat his enemies and reach his UFO.</p>
        </div>
            <img onclick="nextSite()" src="img/start-screen/arrow.png" id="arrow">
    </div>
`;
}

function nextSite() {
    let gameSettings = document.getElementById("gameSettings");
    let gameDescription = document.getElementById('gameDescription');

    if (gameSettings.classList.contains('d-none')) {
        gameSettings.classList.remove('d-none');
        gameDescription.classList.add('d-none');
        document.getElementById('arrow').style.transform = "rotate(180deg)";
    } else {
        gameSettings.classList.add('d-none');
        gameDescription.classList.remove('d-none');
        document.getElementById('arrow').style.transform = "rotate(0deg)";
    }
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); //mit world.js "verbinden"
    // music = new Audio('audio/music.mp3');
    // console.log('My Character is', world.character);
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
