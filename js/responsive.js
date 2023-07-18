let isMobileDevice = 'ontouchstart' in window;


function setMobileDisplay() {
    if (isMobileDevice) {
        const headlineElement = document.getElementById('headline');
        const gameAdjustmentsElement = document.getElementById('gameAdjustments');
        const startBtnElement = document.getElementById('startBtn');

        // headlineElement.classList.add('animationMobile');
        headlineElement.classList.add('headline');
        gameAdjustmentsElement.classList.remove('gameAdjustmentsDesktop');
        gameAdjustmentsElement.classList.add('gameAdjustmentsMobile');
        startBtnElement.style.marginTop = '380px';
    }
}


function checkmobileDevice() {
    const headlineElement = document.getElementById('headline');
    const fullscreenIconElement = document.getElementById('fullscreenIcon');
    const gameBtnsElement = document.getElementById('gameBtns');
    const gameAdjustmentsElement = document.getElementById('gameAdjustments');

    if (!isMobileDevice) {
        headlineElement.classList.add('animation');
        removeAnimation();
        showElement(fullscreenIconElement);
    } else {
        headlineElement.classList.add('fadeout');
        setTimeout( () => {
            hideElement(headlineElement);
        }, 400)
        showElement(gameBtnsElement);
        gameAdjustmentsElement.classList.add('startGameAdjustments');
    }
}
