let isMobileDevice = 'ontouchstart' in window;


function setMobileDisplay() {
    if (isMobileDevice) {
        const headlineElement = document.getElementById('headline');
        const startBtnElement = document.getElementById('startBtn');

        headlineElement.classList.add('headline');
        startBtnElement.style.marginTop = '380px';
    }
}


function checkmobileDevice() {
    const headlineElement = document.getElementById('headline');
    const fullscreenIconElement = document.getElementById('fullscreenIcon');
    const gameBtnsElement = document.getElementById('gameBtns');

    matchMedia800(headlineElement);
    matchMedia720();
    setDesktopOrMobile(headlineElement, fullscreenIconElement, gameBtnsElement);
}


function matchMedia800(headlineElement) {
    if (window.matchMedia("(max-height: 800px)").matches) {
        headlineElement.classList.add('fadeout');
    }
}


function matchMedia720() {
    if (window.matchMedia("(max-width: 720px)").matches) {
        document.getElementById('gameAdjustments').classList.add('gameAdjustmentsMobile')
    }
}


function setDesktopOrMobile(headlineElement, fullscreenIconElement, gameBtnsElement) {
    if (!isMobileDevice) {
        adjustDektopElements(headlineElement, fullscreenIconElement);
    } else {
        adjustMobileElements(headlineElement, gameBtnsElement);
    }
}


function adjustDektopElements(headlineElement, fullscreenIconElement) {
    headlineElement.classList.add('animation');
    removeAnimation();
    showElement(fullscreenIconElement);
}


function adjustMobileElements(headlineElement, gameBtnsElement) {
    setTimeout(() => {
        hideElement(headlineElement);
    }, 400)
    showElement(gameBtnsElement);
}