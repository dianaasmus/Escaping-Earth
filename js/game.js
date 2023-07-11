let canvas;
let world;
let keyboard = new Keyboard(); // keyboard in game.js deklarieren
// let isNextSiteVisible = false; // Variable für den aktuellen Zustand
let music = new Audio('audio/background-music-trimm.mp3');
music.volume = 0.25;
music.loop = true;
let isMobileDevice = 'ontouchstart' in window;
let startBtnPressed = false;

function init() {
    setMobileDisplay();
}

function setMobileDisplay() {
    if (isMobileDevice) {
        document.getElementById('headline').style.marginBottom = "290px !important";
        document.getElementById('gameAdjustments').classList.remove('gameAdjustmentsDesktop');
        document.getElementById('gameAdjustments').classList.add('gameAdjustmentsMobile');
        document.getElementById('startBtn').style.marginTop = "380px";
        document.getElementById('headline').style.fontSize = "calc(4vw + 12px)";
    }
}

window.addEventListener('load', function () {
    let loadingScreen = document.getElementById('circle');
    loadingScreen.style.display = 'none';
});

function start() {
    startBtn.disabled = true;
    startBtnPressed = true;
    document.getElementById('start-img').classList.add('d-none');
    document.getElementById('startBtn').classList.add('d-none');
    startGame();
    checkmobileDevice();
}

function checkmobileDevice() {
    if (!isMobileDevice) {
        console.log('not mobile');
        headline.classList.add('animation');
        removeAnimation();

    } else {
        console.log('mobile');
        headline.classList.add('fadeout');
        document.getElementById('gameBtns').classList.remove('d-none');
        document.getElementById('gameAdjustments').classList.add('startGameAdjustments');
        // world.keyboard.bindBtnsPressEvents();
    }
}

function removeAnimation() {
    setTimeout(() => {
        headline.classList.remove('animation');
        headline.classList.add('headline-2');
    }, 500);
}

function toggleInfo() {
    const startBtn = document.getElementById('startBtn');
    const infoContainer = document.getElementById("info-container");
    const gameBtns = document.getElementById('gameBtns');

    if (infoContainer) {
        infoContainer.remove();

        if (!startBtnPressed) {
            showElement(startBtn);
        } else if (isMobileDevice) {
            // hideElement(overlay);
            showElement(gameBtns);
        }
    } else {
        startBtn.classList.add('d-none');


        document.getElementById('infoContainer2').innerHTML += createGameInfo();

        if (startBtnPressed) {
            applyInfoContainerStyle();
            showElement(document.getElementById('pause'));
        }

        if (isMobileDevice) {
            hideElement(gameBtns);
        }
    }
}

function showElement(element) {
    element.classList.remove('d-none');
}

function hideElement(element) {
    element.classList.add('d-none');
}

function applyInfoContainerStyle() {
    const infoContainer = document.getElementById("info-container");
    infoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
}


function createGameInfo() {
    return `
    <div id="info-container">
        <p id="pause" class="d-none">- pause - </p>
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

function toggleAudio() {
    let audioIcon = document.getElementById('audio-icon');
    if (audioIcon.style.backgroundImage.includes('img/start-screen/add-audio.png')) {
        audioIcon.style.backgroundImage = "url('img/start-screen/remove-audio.png')";
        music.pause();
    } else {
        audioIcon.style.backgroundImage = "url('img/start-screen/add-audio.png')";
        music.play();
    }
}

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); //mit world.js "verbinden"
}