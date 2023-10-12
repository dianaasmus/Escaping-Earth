let canvas;
let world;
let keyboard = new Keyboard();
let music = new Audio('assets/audio/background-music-trimm.mp3');
music.volume = 0.25;
music.loop = true;
let startBtnPressed = false;
let referAudio = false;
let introduction = false;


/**
 * Adds an event listener to the window's load event and hides the loading screen.
 */
window.addEventListener('load', function () {
    let loadingScreen = document.getElementById('circle');
    loadingScreen.style.display = 'none';
});


/**
 * Initializes the application.
 * Sets the mobile display and conditionally adds the refer container and starts the text effect.
 */
function init() {
    setMobileDisplay();
    value = localStorage.getItem('introduction');
    firstIntroduction();
}


/**
 * Performs the first introduction process based on specific conditions.
 * This function sets a flag in local storage to indicate that the introduction has been completed.
 */
function firstIntroduction() {
    if (document.getElementById('circle').style.display = 'none' && !value) {
        localStorage.setItem('introduction', JSON.stringify('true'));
        introduction = true;
        addReferContainer();
        startTextEffect();
    }
}


/**
 * Starts the text effect by writing the predefined text in the designated container.
 */
function startTextEffect() {
    const textContainer = document.getElementById("referText");
    const textToWrite = "Click here for the game description and game instructions.";
    let index = 0;

    writeText(textContainer, textToWrite, index);
}


/**
 * Handles the next action based on the state of the referAudio variable.
 * If referAudio is false, it calls the addReferTextAudio() function.
 * Otherwise, it hides the referContainer element.
 */
function next() {
    if (referAudio == false) {
        addReferTextAudio();
    } else {
        document.getElementById('referContainer').classList.add('d-none');
    }
}


/**
 * Sets referAudio to true and initiates the process of adding refer text audio to the refer container.
 */
function addReferTextAudio() {
    referAudio = true;

    const textContainer = document.getElementById("referText");
    textContainer.innerHTML = '';
    const textToWrite = "Click here to turn the background music on or off.";
    let index = 0;

    styleReferContainer(textContainer);
    writeText(textContainer, textToWrite, index);
}


/**
 * Initiates the start of the game by performing necessary actions such as loading the game elements and setting up the game.
 */
function startBtn() {
    addLoadingCircle();
    startBtn.disabled = true;
    startBtnPressed = true;
    hideElements();
    checkmobileDevice();
    initGame();
    // keyboard.bindBtnsPressEvents();
}


/**
 * Initializes the game by calling functions to set up the game level and starting the game.
 */
function initGame() {
    initLevel();
    startGame();
}


/**
 * Hides specific elements from the view.
 */
function hideElements() {
    hideElement(document.getElementById('start-img'));
    hideElement(document.getElementById('startBtn'));
}


/**
 * Starts the game by creating a new instance of the World class and removing the loading circle from the view.
 */
function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    keyboard.bindBtnsPressEvents();
    removeLoadingCircle();
}


/**
 * Toggles the display of the inner info container based on its current state.
 */
function toggleInfo() {
    const startBtn = document.getElementById('startBtn');
    const innerInfoContainer = document.getElementById("innerInfoContainer");
    const gameBtns = document.getElementById('gameBtns');
    const infoContainer = document.getElementById('infoContainer');
    const infoIcon = document.getElementById('infoIcon');

    if (innerInfoContainer) {
        fullscreenBtnToggle(true);
        removeInnerInfoContainer(innerInfoContainer, startBtn, gameBtns);
        infoIcon.style.backgroundImage = "url(../assets/img/start-screen/info-icon.png)";
    } else {
        fullscreenBtnToggle(false);
        addInnerInfoContainer(startBtn, infoContainer, gameBtns);
        infoIcon.style.backgroundImage = "url(../assets/img/start-screen/close-icon.png)";
    }
}


/**
 * Toggles the state of a fullscreen button and its associated icon.
 * @param {boolean} state - The state of the fullscreen button (true for enabled, false for disabled).
 */
function fullscreenBtnToggle(state) {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const fullscreenIcon = document.getElementById('fullscreenIcon');

    fullscreenBtn.disabled = !state;
    if (state) {
        fullscreenIcon.classList.remove('disabled-btn');
    } else {
        fullscreenIcon.classList.add('disabled-btn');
    }
}


/**
 * Removes the inner info container and updates the view accordingly.
 * @param {HTMLElement} innerInfoContainer - The inner info container element to remove.
 * @param {HTMLElement} startBtn - The start button element.
 * @param {HTMLElement} gameBtns - The game buttons element.
 */
function removeInnerInfoContainer(innerInfoContainer, startBtn, gameBtns) {
    innerInfoContainer.remove();

    if (!startBtnPressed) {
        showElement(startBtn);
    } else if (isMobileDevice) {
        showElement(gameBtns);
    }
}


/**
 * Adds the inner info container and updates the view accordingly.
 * @param {HTMLElement} startBtn - The start button element.
 * @param {HTMLElement} infoContainer - The main info container element.
 * @param {HTMLElement} gameBtns - The game buttons element.
 */
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


/**
 * Toggles the background music on/off by pausing or playing the audio.
 */
function toggleAudio() {
    let audioIcon = document.getElementById('audioIcon');
    if (audioIsPlaying(audioIcon)) {
        audioIcon.style.backgroundImage = "url('assets/img/start-screen/remove-audio.png')";
        music.pause();
    } else {
        audioIcon.style.backgroundImage = "url('assets/img/start-screen/add-audio.png')";
        music.play();
    }
}


/**
 * Switches between displaying game settings and the game description when the next arrow is clicked.
 */
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


/**
 * Shows the game settings by removing the 'd-none' class and hides the game description.
 * @param {HTMLElement} gameSettings - The game settings element.
 * @param {HTMLElement} gameDescription - The game description element.
 * @param {HTMLElement} arrow - The arrow element.
 */
function showGameSettings(gameSettings, gameDescription, arrow) {
    showElement(gameSettings);
    hideElement(gameDescription);
    arrow.style.transform = "rotate(180deg)";
}


/**
 * Shows the game description by removing the 'd-none' class and hides the game settings.
 * @param {HTMLElement} gameSettings - The game settings element.
 * @param {HTMLElement} gameDescription - The game description element.
 * @param {HTMLElement} arrow - The arrow element.
 */
function showGameDescription(gameSettings, gameDescription, arrow) {
    hideElement(gameSettings);
    showElement(gameDescription);
    arrow.style.transform = "rotate(0deg)";
}



/**
 * Starts the game again by resetting certain elements and initializing the game.
 */
function startAgain() {
    let headline = document.getElementById('headline');
    removeGameOver();

    if (!isMobileDevice && !isFullscreen()) {
        startAgainDesktop(headline);
    } else {
        startAgainMobil(headline);
    }

    enableBtns();
    initGame();
}


/**
 * Removes the game over animation and related elements when the game is over.
 */
function removeGameOver() {
    headline.classList.remove('game-over-animation');
    document.getElementById('gameOver').remove();
    document.getElementById('overlay').classList.remove('d-none');
    world.character.stopGame();
}


/**
 * Starts the game again on desktop devices, handling different scenarios based on the device's height.
 */
function startAgainDesktop() {
    if (isMobileDevice) {
        headline.classList.add('fadeout');
        hideElement(headline);
    } else {
        headline.innerHTML = 'Escaping Earth';
        headline.classList.add('animation');
        showElement(document.getElementById('fullscreenIcon'));
    }
}


/**
 * Starts the game again on mobile devices, hiding the headline with a fadeout effect.
 */
function startAgainMobil() {
    headline.classList.add('fadeout');
    hideElement(headline);
}


/**
 * Toggles fullscreen mode for the game.
 */
function fullscreen() {
    const fullscreenElement = document.getElementById('fullscreen');
    if (isFullscreen()) {
        removeFullscreenSettings();
    } else {
        addFullscreenSettings(fullscreenElement);
    }
}


/**
 * Removes fullscreen settings and exits fullscreen mode.
 */
function removeFullscreenSettings() {
    exitFullscreen();
    showElement(document.getElementById('infoIcon'));
    showElement(document.getElementById('audioIcon'));
}


/**
 * Adds fullscreen settings and enters fullscreen mode.
 * @param {HTMLElement} fullscreenElement - The element to be displayed in fullscreen mode.
 */
function addFullscreenSettings(fullscreenElement) {
    enterFullscreen(fullscreenElement);
    hideElement(document.getElementById('infoIcon'));
    hideElement(document.getElementById('audioIcon'));
}


/**
 * Enters fullscreen mode for the specified element.
 * @param {HTMLElement} element - The element to be displayed in fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


/**
 * Displays specific elements after the game is over.
 */
function displayElements() {
    showElement(document.getElementById('headline'));
    hideElement(document.getElementById('overlay'));
    hideElement(document.getElementById('fullscreenIcon'));
    document.getElementById('headline').classList.remove('headline-2');
    checkFullscreen();
    document.getElementById('headline').classList.remove('fadeout');
}


/**
 * Handles the game over event and displays the result based on the outcome.
 * @param {string} result - The result of the game ('youLost' or 'youWon').
 */
function gameOver(result) {
    if (!document.getElementById('gameOver')) {
        document.getElementById('infoIcon').disabled = true;
        document.getElementById('audioIcon').disabled = true;
        addGameOverContainer();
        displayResult(result);
        displayElements();
    }
}


/**
 * Displays the appropriate result based on the outcome of the game.
 * Calls the function for "youLost" or "youWon" scenario accordingly.
 * @param {string} result - The result of the game ('youLost' or 'youWon').
 */
function displayResult(result) {
    if (result == 'youLost') {
        youLost();
    } else {
        youWon();
    }
}