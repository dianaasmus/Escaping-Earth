let isMobileDevice = 'ontouchstart' in window;
// let isLandscape = false;
// let orientationCheck;

function setMobileDisplay() {
    if (isMobileDevice) {
        const headlineElement = document.getElementById('headline');
        const gameAdjustmentsElement = document.getElementById('gameAdjustments');
        const startBtnElement = document.getElementById('startBtn');

        checkOrientatiOnChange();
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
        setTimeout(() => {
            hideElement(headlineElement);
        }, 400)
        showElement(gameBtnsElement);
        gameAdjustmentsElement.classList.add('startGameAdjustments');
    }

    // window.addEventListener("orientationchange", checkOrientatiOnChange);
}


function checkOrientatiOnChange() {
    const statusElement = document.getElementById("portraitMobile");

    if (isMobileDeviceInPortraitMode()) {
        // statusElement.textContent = "Portrait-Modus";
        console.log('Bildschirm drehen!');
        document.body.innerHTML += addPortraitContainer();

    } else {
        // statusElement.textContent = "Portrait-Modus";
        console.log('div ausblenden');
    }
}

function isMobileDeviceInPortraitMode() {
    return window.matchMedia("(orientation: portrait)").matches;
}

function addPortraitContainer() {
    return `
        <div id="portraitMobile">
            <h2>Please rotate your device!</h2>
            <img src="img/start-screen/rotate-phone-img.png" class="rotate-phone-icon">
        </div>
    `;
}