/**
 * Checks if the current device is a mobile device by detecting touch support.
 * @type {boolean}
 */
let isMobileDevice = 'ontouchstart' in window;


/**
 * Sets the mobile display adjustments if the current device is a mobile device.
 */
function setMobileDisplay() {
    if (isMobileDevice) {
        const headlineElement = document.getElementById('headline');
        const startBtnElement = document.getElementById('startBtn');

        headlineElement.classList.add('headline');
        startBtnElement.style.marginTop = '380px';
    }
}


/**
 * Checks the mobile device status and performs necessary adjustments for desktop or mobile views.
 */
function checkmobileDevice() {
    const headlineElement = document.getElementById('headline');
    const fullscreenIconElement = document.getElementById('fullscreenIcon');
    const gameBtnsElement = document.getElementById('gameBtns');

    matchMedia800(headlineElement);
    matchMedia720();
    setDesktopOrMobile(headlineElement, fullscreenIconElement, gameBtnsElement);
}


/**
 * Performs specific actions when the screen height matches 800 pixels or less.
 * @param {HTMLElement} headlineElement - The headline element.
 */
function matchMedia800(headlineElement) {
    if (window.matchMedia("(max-height: 800px)").matches) {
        headlineElement.classList.add('fadeout');
    }
}


/**
 * Performs specific actions when the screen width matches 720 pixels or less.
 */
function matchMedia720() {
    if (window.matchMedia("(max-width: 720px)").matches) {
        document.getElementById('gameAdjustments').classList.add('gameAdjustmentsMobile')
    }
}


/**
 * Sets desktop or mobile view adjustments based on the mobile device status.
 * @param {HTMLElement} headlineElement - The headline element.
 * @param {HTMLElement} fullscreenIconElement - The fullscreen icon element.
 * @param {HTMLElement} gameBtnsElement - The game buttons element.
 */
function setDesktopOrMobile(headlineElement, fullscreenIconElement, gameBtnsElement) {
    if (!isMobileDevice) {
        adjustDektopElements(headlineElement, fullscreenIconElement);
    } else {
        adjustMobileElements(headlineElement, gameBtnsElement);
    }
}


/**
 * Adjusts elements for desktop view.
 * @param {HTMLElement} headlineElement - The headline element.
 * @param {HTMLElement} fullscreenIconElement - The fullscreen icon element.
 */
function adjustDektopElements(headlineElement, fullscreenIconElement) {
    headlineElement.classList.add('animation');
    removeAnimation();
    showElement(fullscreenIconElement);
}


/**
 * Adjusts elements for mobile view.
 * @param {HTMLElement} headlineElement - The headline element.
 * @param {HTMLElement} gameBtnsElement - The game buttons element.
 */
function adjustMobileElements(headlineElement, gameBtnsElement) {
    setTimeout(() => {
        hideElement(headlineElement);
    }, 400)
    showElement(gameBtnsElement);
}