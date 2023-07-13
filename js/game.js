let canvas;
let world;
let keyboard = new Keyboard(); // keyboard in game.js deklarieren
let music = new Audio('audio/background-music-trimm.mp3');
music.volume = 0.25;
music.loop = true;
let isMobileDevice = 'ontouchstart' in window;
let startBtnPressed = false;


window.addEventListener('load', function () {
    let loadingScreen = document.getElementById('circle');
    loadingScreen.style.display = 'none';
});


function init() {
    setMobileDisplay();
}


function setMobileDisplay() {
    if (isMobileDevice) {
        const headline = document.getElementById('headline');
        const gameAdjustments = document.getElementById('gameAdjustments');
        const startBtn = document.getElementById('startBtn');

        headline.classList.add('headline');
        gameAdjustments.classList.remove('gameAdjustmentsDesktop');
        gameAdjustments.classList.add('gameAdjustmentsMobile');
        startBtn.style.marginTop = "380px";
    }
}


function start() {
    startBtn.disabled = true;
    startBtnPressed = true;
    hideElement(document.getElementById('start-img'));
    hideElement(document.getElementById('startBtn'));
    checkmobileDevice();
    initLevel();
    startGame();
    keyboard.bindBtnsPressEvents();
}


function checkmobileDevice() {
    if (!isMobileDevice) {
        headline.classList.add('animation');
        removeAnimation();
    } else {
        headline.classList.add('fadeout');
        hideElement(document.getElementById('headline'));
        showElement(document.getElementById('gameBtns'));
        document.getElementById('gameAdjustments').classList.add('startGameAdjustments');
    }
}


function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); //mit world.js "verbinden"
}


function removeAnimation() {
    setTimeout(() => {
        headline.classList.remove('animation');
        headline.classList.add('headline-2');
    }, 500);
}


function toggleInfo() {
    const startBtn = document.getElementById('startBtn');
    const innerInfoContainer = document.getElementById("innerInfoContainer");
    const gameBtns = document.getElementById('gameBtns');
    const infoContainer = document.getElementById('infoContainer');

    if (innerInfoContainer) {
        removeInnerInfoContainer(innerInfoContainer, startBtn, gameBtns);
    } else {
        addInnerInfoContainer(startBtn, infoContainer, gameBtns);
    }
}


function removeInnerInfoContainer(innerInfoContainer, startBtn, gameBtns) {
    innerInfoContainer.remove();

    if (!startBtnPressed) {
        showElement(startBtn);
    } else if (isMobileDevice) {
        showElement(gameBtns);
    }
}


function addInnerInfoContainer(startBtn, infoContainer, gameBtns) {
    startBtn.classList.add('d-none');
    infoContainer.innerHTML += createGameInfo();

    if (startBtnPressed) {
        applyInfoContainerStyle();
        showElement(document.getElementById('pause'));
    }
    if (isMobileDevice) {
        hideElement(gameBtns);
    }
}


function createGameInfo() {
    return `
    <div id="innerInfoContainer">
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


function nextSite() {
    const gameSettings = document.getElementById("gameSettings");
    const gameDescription = document.getElementById('gameDescription');
    const arrow = document.getElementById('arrow');

    if (gameSettings.classList.contains('d-none')) {
        showGameSettings(gameSettings, gameDescription, arrow);
    } else {
        showGameDescription(gameSettings, gameDescription, arrow);
    }
}


function showGameSettings(gameSettings, gameDescription, arrow) {
    showElement(gameSettings);
    hideElement(gameDescription);
    arrow.style.transform = "rotate(180deg)";
}


function showGameDescription(gameSettings, gameDescription, arrow) {
    hideElement(gameSettings);
    showElement(gameDescription);
    arrow.style.transform = "rotate(0deg)";
}


function applyInfoContainerStyle() {
    const infoContainer = document.getElementById("innerInfoContainer");
    infoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
}


function showElement(element) {
    element.classList.remove('d-none');
}


function hideElement(element) {
    element.classList.add('d-none');
}


function startAgain() {
    let headline = document.getElementById('headline');
    headline.classList.remove('headline-2');
    headline.classList.remove('game-over-animation');
    headline.classList.add('animation');
    headline.innerHTML = 'Escaping Earth';
    document.getElementById('info-icon').disabled = false;
    document.getElementById('audio-icon').disabled = false;
    document.getElementById('gameOver').remove();
    world.character.stopGame()
    startGame();
}