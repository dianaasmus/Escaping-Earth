let canvas;
let world;
let keyboard = new Keyboard();
let music = new Audio('audio/background-music-trimm.mp3');
music.volume = 0.25;
music.loop = true;
let startBtnPressed = false;
let referAudio = false;


window.addEventListener('load', function () {
    let loadingScreen = document.getElementById('circle');
    loadingScreen.style.display = 'none';
});


function init() {
    setMobileDisplay();
    if (document.getElementById('circle').style.display = 'none') {
        addReferContainer();
        startTextEffect();
    }
}


function writeText(textContainer, textToWrite, index, speed) {
    if (index < textToWrite.length) {
        textContainer.textContent += textToWrite.charAt(index);
        index++;
        setTimeout(function () {
            writeText(textContainer, textToWrite, index, speed);
        }, speed);
    }
}


function startTextEffect() {
    const textContainer = document.getElementById("referText");
    const textToWrite = "Click here for the game description and game instructions.";
    const speed = 50;
    let index = 0;

    writeText(textContainer, textToWrite, index, speed);
}


function addReferContainer() {
    document.body.innerHTML += `
    <div id="referContainer" onclick="next()">
        <div id="referText"></div>
        <img src="img/start-screen/refer-arrow.png" id="referArrow">
    </div>
    `;
}


function next() {
    if (referAudio == false) {
        addReferTextAudio();
    } else {
        document.getElementById('referContainer').classList.add('d-none');
    }
}


function addReferTextAudio() {
    referAudio = true;

    const textContainer = document.getElementById("referText");
    textContainer.innerHTML = '';
    const textToWrite = "Click here to turn the background music on or off.";
    const speed = 50;
    let index = 0;

    styleReferContainer(textContainer);
    writeText(textContainer, textToWrite, index, speed);
}


function styleReferContainer(textContainer) {
    textContainer.classList.add('referTextAudio');
    document.getElementById('referArrow').classList.add('refer-arrow-Audio');
}


function startBtn() {
    addLoadingCircle();
    startBtn.disabled = true;
    startBtnPressed = true;
    hideElements();
    checkmobileDevice();
    initGame();
    keyboard.bindBtnsPressEvents();
}


function addLoadingCircle() {
    document.getElementById('circle').style.display = "flex";
    document.getElementById('circle').classList.add('canvas-circle');
}


function initGame() {
    initLevel();
    startGame();
}


function hideElements() {
    hideElement(document.getElementById('start-img'));
    hideElement(document.getElementById('startBtn'));
}


function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    removeLoadingCircle();
}


function removeLoadingCircle() {
    setTimeout(() => {
        document.getElementById('circle').style.display = "none";
    }, 1000);
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
    if (audioIsPlaying(audioIcon)) {
        audioIcon.style.backgroundImage = "url('img/start-screen/remove-audio.png')";
        music.pause();
    } else {
        audioIcon.style.backgroundImage = "url('img/start-screen/add-audio.png')";
        music.play();
    }
}


function audioIsPlaying(audioIcon) {
    return audioIcon.style.backgroundImage.includes('img/start-screen/add-audio.png');
}


function nextSite() {
    const gameSettings = document.getElementById("gameSettings");
    const gameDescription = document.getElementById('gameDescription');
    const arrow = document.getElementById('arrow');

    if (hidingGameSetting(gameSettings)) {
        showGameSettings(gameSettings, gameDescription, arrow);
    } else {
        showGameDescription(gameSettings, gameDescription, arrow);
    }
}


function hidingGameSetting(gameSettings) {
    return gameSettings.classList.contains('d-none');
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
    infoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
}


function showElement(element) {
    element.classList.remove('d-none');
}


function hideElement(element) {
    element.classList.add('d-none');
}


function startAgain() {
    let headline = document.getElementById('headline');
    removeGameOver();

    if (!isMobileDevice && !isFullscreen()) {
        startAgainDesktop(headline);
    } else {
        startAgainMobil(headline);
    }

    initGame();
}


function removeGameOver() {
    headline.classList.remove('game-over-animation');
    document.getElementById('gameOver').remove();
    document.getElementById('overlay').classList.remove('d-none');
    world.character.stopGame();
}


function startAgainDesktop() {
    if (window.matchMedia("(max-height: 800px)").matches) {
        headline.classList.add('fadeout');
        hideElement(headline);
    } else {
        headline.innerHTML = 'Escaping Earth';
        headline.classList.add('animation');
        showElement(document.getElementById('fullscreenIcon'));
    }
}


function startAgainMobil() {
    headline.classList.add('fadeout');
    hideElement(headline);
}


function fullscreen() {
    const fullscreenElement = document.getElementById('fullscreen');
    if (isFullscreen()) {
        removeFullscreenSettings();
    } else {
        addFullscreenSettings(fullscreenElement);
    }
}


function removeFullscreenSettings() {
    exitFullscreen();
    showElement(document.getElementById('info-icon'));
    showElement(document.getElementById('audio-icon'));
}


function addFullscreenSettings(fullscreenElement) {
    enterFullscreen(fullscreenElement);
    hideElement(document.getElementById('info-icon'));
    hideElement(document.getElementById('audio-icon'));
}


function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


function addGameOverContainer() {
    document.getElementById('fullscreen').innerHTML += `<div id="gameOver"><button onclick="startAgain()" id="gameOverBtn">START AGAIN</button></div>`;
}


function displayElements() {
    showElement(document.getElementById('headline'));
    hideElement(document.getElementById('overlay'));
    hideElement(document.getElementById('fullscreenIcon'));
    document.getElementById('headline').classList.remove('headline-2');
    checkFullscreen();
    document.getElementById('headline').classList.remove('fadeout');
}


function checkFullscreen() {
    if (isFullscreen()) {
        document.getElementById('headline').classList.add('gameOverFullscreen');
        document.getElementById('gameOver').style.alignItems = "unset";
    } else {
        document.getElementById('headline').classList.add('game-over-animation');
    }
}


function gameOver(result) {
    if (!document.getElementById('gameOver')) {
        addGameOverContainer();
        displayElements();
        displayResult(result);
    }
}


function displayResult(result) {
    if (result == 'youLost') {
        youLost();
    } else {
        youWon();
    }
}


function youLost() {
    document.getElementById('headline').innerHTML = 'You Lost';
}


function youWon() {
    document.getElementById('headline').innerHTML = 'YOU WON!';
}