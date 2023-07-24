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

    if (!isMobileDevice) {
        headlineElement.classList.add('animation');
        removeAnimation();
        showElement(fullscreenIconElement);
    } else {
        if (window.matchMedia("(max-height: 800px)").matches) {
            headline.classList.add('fadeout'); 
        }
        setTimeout(() => {
            hideElement(headlineElement);
        }, 400)
        showElement(gameBtnsElement);
    }
}