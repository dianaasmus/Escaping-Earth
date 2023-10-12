/**
 * Writes text to the given textContainer with a typewriter-like effect.
 * @param {HTMLElement} textContainer - The container element where the text will be written.
 * @param {string} textToWrite - The text to write in the textContainer.
 * @param {number} index - The current index of the text being written.
 */
function writeText(textContainer, textToWrite, index) {
    const speed = 25;
    if (index < textToWrite.length) {
        textContainer.textContent += textToWrite.charAt(index);
        index++;

        setTimeout(function () {
            writeText(textContainer, textToWrite, index, speed);
        }, speed);
    }
}


/**
 * Adds a refer container to the document body, which includes text and an arrow image.
 */
function addReferContainer() {
    document.body.innerHTML += `
    <div id="referContainer" onclick="next()">
        <div id="referText"></div>
        <img src="assets/img/start-screen/refer-arrow.png" id="referArrow">
    </div>
    `;
}


/**
 * Applies specific styles to the given textContainer and referArrow.
 * @param {HTMLElement} textContainer - The container element to style for the refer text audio.
 */
function styleReferContainer(textContainer) {
    textContainer.classList.add('referTextAudio');
    document.getElementById('referArrow').classList.add('refer-arrow-Audio');
}


/**
 * Adds a loading circle to the document to indicate that the game is loading.
 */
function addLoadingCircle() {
    document.getElementById('circle').style.display = "flex";
    document.getElementById('circle').classList.add('canvas-circle');
}


/**
 * Removes the loading circle from the view after a delay.
 */
function removeLoadingCircle() {
    setTimeout(() => {
        document.getElementById('circle').style.display = "none";
    }, 1000);
}


/**
 * Removes the animation effect from the headline element after a delay.
 */
function removeAnimation() {
    setTimeout(() => {
        headline.classList.remove('animation');
        headline.classList.add('headline-2');
    }, 500);
}


/**
 * Creates the HTML markup for the inner info container.
 * @returns {string} - The HTML markup for the inner info container.
 */
function createGameInfo() {
    return `
    <div id="innerInfoContainer">
        <p id="pause" class="d-none">- pause - </p>
        <div id="info-content">
            <div id="gameSettings" class="d-none">
                <div class="column">                
                    <div class="align">
                        <img src="assets/img/start-screen/arrow.png" class="key-icons">
                        <p>JUMP</p>
                    </div>
                    <div class="align">
                        <img src="assets/img/start-screen/arrow-left.png" class="key-icons">
                        <p>LEFT</p>
                    </div>
                    <div class="align">
                        <img src="assets/img/start-screen/arrow-right.png" class="key-icons">
                        <p>RIGHT</p>
                    </div>
                    <div class="align">
                        <div class="key-icon"></div>
                        <p>SHOOT</p>
                    </div>
                </div>
                <div class="column">
                    <div class="align">
                        <img src="assets/img/lives/14.png" class="collect-icons">
                        <p>LIVES</p>
                    </div>
                    <div class="align">
                        <img src="assets/img/ammunition/13.png" class="collect-icons">
                        <p>AMMUNITION</p>
                    </div>
                </div>
            </div>
                <p id="gameDescription">It is June 3245 when, suddenly, an extraterrestrial being crashes its UFO over Earth. Trapped in a world full of zombies and robots, 'June-3245' strives to fight for survival and escape from the planet. Help him defeat his enemies and reach his UFO.</p>
        </div>
            <img onclick="nextSite()" src="assets/img/start-screen/arrow.png" id="arrow">
            <div class="imprint-container">
                <div class="copyright-name-year">
                    <img src="assets/img/copyright-icon.png" alt="Copyright Logo">
                    <span> Diana Asmus 2023</span>
                </div>
            
                <div>
                    <a href="imprint.html" fragment="imprint">Imprint</a> -
                    <a href="imprint.html">Data Protection</a>
                </div>
            </div>
    </div>
`;
}


/**
 * Checks if the audio is currently playing based on the audioIcon's background image.
 * @param {HTMLElement} audioIcon - The audio icon element.
 * @returns {boolean} - True if the audio is currently playing, otherwise false.
 */
function audioIsPlaying(audioIcon) {
    return audioIcon.style.backgroundImage.includes('assets/img/start-screen/add-audio.png');
}


/**
 * Checks if the game settings are currently hidden based on the presence of the 'd-none' class.
 * @param {HTMLElement} gameSettings - The game settings element.
 * @returns {boolean} - True if the game settings are hidden, otherwise false.
 */
function hidingGameSetting(gameSettings) {
    return gameSettings.classList.contains('d-none');
}


/**
 * Applies specific styles to the info container to give it a semi-transparent background.
 */
function applyInfoContainerStyle() {
    const infoContainer = document.getElementById("innerInfoContainer");
    infoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
}


/**
 * Shows the given element by removing the 'd-none' class.
 * @param {HTMLElement} element - The element to show.
 */
function showElement(element) {
    element.classList.remove('d-none');
}


/**
 * Hides the given element by adding the 'd-none' class.
 * @param {HTMLElement} element - The element to hide.
 */
function hideElement(element) {
    element.classList.add('d-none');
}

/**
 * Enables the Buttons after game restart.
 */
function enableBtns() {
    document.getElementById('infoIconBtn').disabled = false;
    document.getElementById('audioIconBtn').disabled = false;
}


/**
 * Checks if the game is currently in fullscreen mode.
 * @returns {boolean} - True if the game is in fullscreen mode, otherwise false.
 */
function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
}


/**
 * Adds the game over container to the fullscreen element.
 */
function addGameOverContainer() {
    document.getElementById('fullscreen').innerHTML += `<div id="gameOver"><button onclick="startAgain()" id="gameOverBtn">START AGAIN</button></div>`;
}


/**
 * Checks whether the game is in fullscreen mode and applies corresponding styles accordingly.
 */
function checkFullscreen() {
    if (isFullscreen()) {
        document.getElementById('headline').classList.add('gameOverFullscreen');
        document.getElementById('gameOver').style.alignItems = "unset";
    } else {
        document.getElementById('headline').classList.add('game-over-animation');
    }
}


/**
 * Displays the appropriate result message for the "youLost" scenario.
 */
function youLost() {
    document.getElementById('headline').innerHTML = 'You Lost';
}


/**
 * Displays the appropriate result message for the "youWon" scenario.
 */
function youWon() {
    document.getElementById('headline').innerHTML = 'YOU WON!';
}

document.addEventListener('click', function (event) {
    const infoContainer = document.getElementById('infoContainer');
    const overlay = document.getElementById('overlay');

    if (infoContainer && overlay && !infoContainer.contains(event.target) && !overlay.contains(event.target)) {

        infoContainer.innerHTML = '';
        
    }
});